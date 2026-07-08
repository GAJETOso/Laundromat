// LustraTokens.swift
// Lustra design tokens for iOS (SwiftUI) — generated from tokens.json v1.0.0.
// Drop into your Xcode project; requires iOS 15+.
//
// Usage:
//   Text("Laundry, elevated.")
//       .font(Lustra.Font.hero)
//       .foregroundStyle(Lustra.Color.foreground)
//   Button("Schedule Pickup") { ... }.buttonStyle(LustraPrimaryButtonStyle())

import SwiftUI

public enum Lustra {

    // MARK: - Colors

    public enum Color {
        // Ink scale
        public static let ink50  = SwiftUI.Color(hex: 0xF4F6FB)
        public static let ink100 = SwiftUI.Color(hex: 0xE8ECF6)
        public static let ink200 = SwiftUI.Color(hex: 0xCCD6EA)
        public static let ink300 = SwiftUI.Color(hex: 0x9FB1D6)
        public static let ink400 = SwiftUI.Color(hex: 0x6B87BD)
        public static let ink500 = SwiftUI.Color(hex: 0x4867A5)
        public static let ink600 = SwiftUI.Color(hex: 0x37508A)
        public static let ink700 = SwiftUI.Color(hex: 0x2E4170)
        public static let ink800 = SwiftUI.Color(hex: 0x29385E)
        public static let ink900 = SwiftUI.Color(hex: 0x0B1220)
        public static let ink950 = SwiftUI.Color(hex: 0x060A14)

        // Aqua scale
        public static let aqua50  = SwiftUI.Color(hex: 0xECFEFF)
        public static let aqua100 = SwiftUI.Color(hex: 0xCFFAFE)
        public static let aqua200 = SwiftUI.Color(hex: 0xA5F3FC)
        public static let aqua300 = SwiftUI.Color(hex: 0x67E8F9)
        public static let aqua400 = SwiftUI.Color(hex: 0x22D3EE)
        public static let aqua500 = SwiftUI.Color(hex: 0x06B6D4)
        public static let aqua600 = SwiftUI.Color(hex: 0x0891B2)
        public static let aqua700 = SwiftUI.Color(hex: 0x0E7490)

        // Semantic (adaptive light/dark)
        public static let background = adaptive(light: 0xF7F8FB, dark: 0x060A14)
        public static let foreground = adaptive(light: 0x0B1220, dark: 0xEDF2FA)
        public static let card       = adaptive(light: 0xFFFFFF, dark: 0x0D1424)
        public static let muted      = adaptive(light: 0x64748B, dark: 0x94A3B8)
        public static let border     = adaptive(light: 0xE2E8F0, dark: 0x1E293B)
        public static let accent     = adaptive(light: 0x06B6D4, dark: 0x22D3EE)

        // Status
        public static let success    = SwiftUI.Color(hex: 0x10B981)
        public static let info       = SwiftUI.Color(hex: 0x06B6D4)
        public static let warning    = SwiftUI.Color(hex: 0xF59E0B)
        public static let processing = SwiftUI.Color(hex: 0x8B5CF6)
        public static let error      = SwiftUI.Color(hex: 0xEF4444)

        private static func adaptive(light: UInt32, dark: UInt32) -> SwiftUI.Color {
            SwiftUI.Color(UIColor { traits in
                traits.userInterfaceStyle == .dark ? UIColor(hex: dark) : UIColor(hex: light)
            })
        }
    }

    /// Primary CTA gradient — 135°, aqua → ink blue.
    public static let ctaGradient = LinearGradient(
        colors: [SwiftUI.Color(hex: 0x06B6D4), SwiftUI.Color(hex: 0x4867A5)],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    // MARK: - Typography (SF Pro via system font — matches web)

    public enum Font {
        public static let caption   = SwiftUI.Font.system(size: 12, weight: .semibold)
        public static let bodySmall = SwiftUI.Font.system(size: 14)
        public static let body      = SwiftUI.Font.system(size: 16)
        public static let titleSmall = SwiftUI.Font.system(size: 18, weight: .semibold)
        public static let title     = SwiftUI.Font.system(size: 20, weight: .semibold)
        public static let headline  = SwiftUI.Font.system(size: 24, weight: .bold)
        public static let displaySmall = SwiftUI.Font.system(size: 30, weight: .bold)
        public static let display   = SwiftUI.Font.system(size: 36, weight: .bold)
        public static let hero      = SwiftUI.Font.system(size: 48, weight: .bold)
        /// Uppercase eyebrow labels — apply .tracking(2.4) and .textCase(.uppercase).
        public static let eyebrow   = SwiftUI.Font.system(size: 12, weight: .bold)
    }

    // MARK: - Shape & spacing

    public enum Radius {
        public static let control: CGFloat = 16
        public static let card: CGFloat = 24
        public static let sheet: CGFloat = 32
        public static let hero: CGFloat = 40
        public static let pill: CGFloat = 999
    }

    public enum Spacing {
        public static let screenPadding: CGFloat = 20
        public static let cardPadding: CGFloat = 28
        public static let sectionGap: CGFloat = 96
    }

    // MARK: - Motion

    public enum Motion {
        /// Standard easing — matches web cubic-bezier(0.21, 0.6, 0.35, 1).
        public static let standard = Animation.timingCurve(0.21, 0.6, 0.35, 1, duration: 0.7)
        public static let control  = Animation.timingCurve(0.21, 0.6, 0.35, 1, duration: 0.25)
        public static let staggerStep: Double = 0.08
    }
}

// MARK: - Button styles

public struct LustraPrimaryButtonStyle: ButtonStyle {
    public init() {}
    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(Lustra.Font.titleSmall)
            .foregroundStyle(.white)
            .frame(maxWidth: .infinity, minHeight: 52)
            .background(Lustra.ctaGradient, in: Capsule())
            .shadow(color: Lustra.Color.aqua400.opacity(0.35), radius: 30, y: 0)
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .animation(Lustra.Motion.control, value: configuration.isPressed)
    }
}

public struct LustraSecondaryButtonStyle: ButtonStyle {
    public init() {}
    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(Lustra.Font.titleSmall)
            .foregroundStyle(Lustra.Color.foreground)
            .frame(maxWidth: .infinity, minHeight: 52)
            .background(Lustra.Color.card, in: Capsule())
            .overlay(Capsule().strokeBorder(Lustra.Color.border, lineWidth: 1))
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .animation(Lustra.Motion.control, value: configuration.isPressed)
    }
}

// MARK: - Card container

public struct LustraCard<Content: View>: View {
    private let content: Content
    public init(@ViewBuilder content: () -> Content) { self.content = content() }
    public var body: some View {
        content
            .padding(Lustra.Spacing.cardPadding)
            .background(Lustra.Color.card, in: RoundedRectangle(cornerRadius: Lustra.Radius.card, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: Lustra.Radius.card, style: .continuous)
                    .strokeBorder(Lustra.Color.border, lineWidth: 1)
            )
            .shadow(color: Lustra.Color.ink900.opacity(0.12), radius: 12, y: 8)
    }
}

// MARK: - Hex helpers

extension SwiftUI.Color {
    init(hex: UInt32) {
        self.init(
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255
        )
    }
}

extension UIColor {
    convenience init(hex: UInt32) {
        self.init(
            red: CGFloat((hex >> 16) & 0xFF) / 255,
            green: CGFloat((hex >> 8) & 0xFF) / 255,
            blue: CGFloat(hex & 0xFF) / 255,
            alpha: 1
        )
    }
}
