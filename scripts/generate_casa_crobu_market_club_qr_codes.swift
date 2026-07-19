#!/usr/bin/env swift

import AppKit
import CoreImage
import Foundation
import Vision

struct Channel {
  let fileSuffix: String
  let value: String
}

struct Market {
  let location: String
  let fileStem: String
}

let signupBaseURL = "https://shopify-audit-system.vercel.app"
let campaign = "summer-2026"
let markets = [
  Market(location: "Belleview Station DTC", fileStem: "belleview_station_dtc"),
  Market(location: "Central Park", fileStem: "central_park"),
  Market(location: "Festival Park", fileStem: "festival_park"),
  Market(location: "Gluten Free Market", fileStem: "gluten_free_market"),
  Market(location: "Golden", fileStem: "golden"),
  Market(location: "Lafayette", fileStem: "lafayette"),
  Market(location: "Longmont Farmer's Market", fileStem: "longmont_farmers_market"),
  Market(location: "Louisville", fileStem: "louisville"),
  Market(location: "Parker", fileStem: "parker"),
  Market(location: "Thornton", fileStem: "thornton"),
  Market(location: "Westminster", fileStem: "westminster"),
]
let channels = [
  Channel(fileSuffix: "booth_sign", value: "booth_code"),
  Channel(fileSuffix: "product_sticker", value: "product_sticker"),
]

let scriptURL = URL(fileURLWithPath: #filePath)
let repositoryDirectory = scriptURL
  .deletingLastPathComponent()
  .deletingLastPathComponent()
let outputDirectory = repositoryDirectory.appendingPathComponent("assets/casa-crobu/market-club-qr-codes")
let fileManager = FileManager.default
let context = CIContext()

func signupURL(location: String, channel: String) -> String {
  var components = URLComponents(string: signupBaseURL)!
  components.queryItems = [
    URLQueryItem(name: "location", value: location),
    URLQueryItem(name: "channel", value: channel),
    URLQueryItem(name: "campaign", value: campaign),
  ]
  return components.url!.absoluteString
}

func qrImage(for value: String) -> CIImage {
  guard let filter = CIFilter(name: "CIQRCodeGenerator") else {
    fatalError("CIQRCodeGenerator is unavailable")
  }
  filter.setValue(Data(value.utf8), forKey: "inputMessage")
  filter.setValue("Q", forKey: "inputCorrectionLevel")

  guard let qrCode = filter.outputImage else {
    fatalError("Could not generate a QR code for \(value)")
  }

  let moduleCount = Int(qrCode.extent.width)
  let scale = 40
  let quietZone = 4 * scale
  let outputSize = (moduleCount * scale) + (quietZone * 2)
  let scaled = qrCode.transformed(by: CGAffineTransform(scaleX: CGFloat(scale), y: CGFloat(scale)))
  let positioned = scaled.transformed(by: CGAffineTransform(translationX: CGFloat(quietZone), y: CGFloat(quietZone)))
  let background = CIImage(color: .white).cropped(to: CGRect(x: 0, y: 0, width: outputSize, height: outputSize))

  return positioned.composited(over: background)
}

func writePNG(_ image: CIImage, to fileURL: URL) throws {
  guard let cgImage = context.createCGImage(image, from: image.extent) else {
    throw NSError(domain: "MarketClubQR", code: 1, userInfo: [NSLocalizedDescriptionKey: "Could not render \(fileURL.lastPathComponent)"])
  }
  let bitmap = NSBitmapImageRep(cgImage: cgImage)
  guard let png = bitmap.representation(using: .png, properties: [:]) else {
    throw NSError(domain: "MarketClubQR", code: 2, userInfo: [NSLocalizedDescriptionKey: "Could not encode \(fileURL.lastPathComponent)"])
  }
  try png.write(to: fileURL, options: .atomic)
}

func decodedPayload(at fileURL: URL) throws -> String? {
  guard let image = NSImage(contentsOf: fileURL),
        let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    throw NSError(domain: "MarketClubQR", code: 3, userInfo: [NSLocalizedDescriptionKey: "Could not read \(fileURL.lastPathComponent)"])
  }

  let request = VNDetectBarcodesRequest()
  request.symbologies = [.qr]
  let handler = VNImageRequestHandler(cgImage: cgImage)
  try handler.perform([request])
  return (request.results ?? []).first?.payloadStringValue
}

for channel in channels {
  for market in markets {
    let url = signupURL(location: market.location, channel: channel.value)
    let fileURL = outputDirectory.appendingPathComponent("\(market.fileStem)_\(channel.fileSuffix).png")
    try writePNG(qrImage(for: url), to: fileURL)

    guard try decodedPayload(at: fileURL) == url else {
      throw NSError(domain: "MarketClubQR", code: 4, userInfo: [NSLocalizedDescriptionKey: "Verification failed for \(fileURL.lastPathComponent)"])
    }

    print("Generated \(fileURL.path.replacingOccurrences(of: repositoryDirectory.path + "/", with: ""))")
  }
}
