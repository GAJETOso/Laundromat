// LustraTokens.kt
// Lustra design tokens for Android (Jetpack Compose) — generated from tokens.json v1.0.0.
//
// Usage:
//   Text("Laundry, elevated.", style = LustraType.Hero, color = LustraTheme.colors.foreground)
//   LustraPrimaryButton(text = "Schedule Pickup", onClick = { ... })

package com.lustra.designtokens

import androidx.compose.foundation.background
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/* ----------------------------- Color palette ----------------------------- */

object LustraPalette {
    // Ink scale
    val Ink50 = Color(0xFFF4F6FB)
    val Ink100 = Color(0xFFE8ECF6)
    val Ink200 = Color(0xFFCCD6EA)
    val Ink300 = Color(0xFF9FB1D6)
    val Ink400 = Color(0xFF6B87BD)
    val Ink500 = Color(0xFF4867A5)
    val Ink600 = Color(0xFF37508A)
    val Ink700 = Color(0xFF2E4170)
    val Ink800 = Color(0xFF29385E)
    val Ink900 = Color(0xFF0B1220)
    val Ink950 = Color(0xFF060A14)

    // Aqua scale
    val Aqua50 = Color(0xFFECFEFF)
    val Aqua100 = Color(0xFFCFFAFE)
    val Aqua200 = Color(0xFFA5F3FC)
    val Aqua300 = Color(0xFF67E8F9)
    val Aqua400 = Color(0xFF22D3EE)
    val Aqua500 = Color(0xFF06B6D4)
    val Aqua600 = Color(0xFF0891B2)
    val Aqua700 = Color(0xFF0E7490)

    // Status
    val Success = Color(0xFF10B981)
    val Info = Color(0xFF06B6D4)
    val Warning = Color(0xFFF59E0B)
    val Processing = Color(0xFF8B5CF6)
    val Error = Color(0xFFEF4444)
}

/** Semantic colors, adaptive to theme. */
@Immutable
data class LustraColors(
    val background: Color,
    val foreground: Color,
    val card: Color,
    val muted: Color,
    val border: Color,
    val accent: Color,
)

val LustraLightColors = LustraColors(
    background = Color(0xFFF7F8FB),
    foreground = Color(0xFF0B1220),
    card = Color(0xFFFFFFFF),
    muted = Color(0xFF64748B),
    border = Color(0xFFE2E8F0),
    accent = LustraPalette.Aqua500,
)

val LustraDarkColors = LustraColors(
    background = Color(0xFF060A14),
    foreground = Color(0xFFEDF2FA),
    card = Color(0xFF0D1424),
    muted = Color(0xFF94A3B8),
    border = Color(0xFF1E293B),
    accent = LustraPalette.Aqua400,
)

object LustraTheme {
    val colors: LustraColors
        @Composable get() = if (isSystemInDarkTheme()) LustraDarkColors else LustraLightColors
}

/** Primary CTA gradient — 135°, aqua → ink blue. */
val LustraCtaGradient = Brush.linearGradient(
    colors = listOf(LustraPalette.Aqua500, LustraPalette.Ink500)
)

/* ------------------------------- Typography ------------------------------- */

object LustraType {
    private val Default = FontFamily.Default // Roboto / device default, matching web's system stack

    val Caption = TextStyle(fontFamily = Default, fontSize = 12.sp, lineHeight = 16.sp, fontWeight = FontWeight.SemiBold)
    val BodySmall = TextStyle(fontFamily = Default, fontSize = 14.sp, lineHeight = 21.sp)
    val Body = TextStyle(fontFamily = Default, fontSize = 16.sp, lineHeight = 26.sp)
    val TitleSmall = TextStyle(fontFamily = Default, fontSize = 18.sp, lineHeight = 26.sp, fontWeight = FontWeight.SemiBold)
    val Title = TextStyle(fontFamily = Default, fontSize = 20.sp, lineHeight = 28.sp, fontWeight = FontWeight.SemiBold)
    val Headline = TextStyle(fontFamily = Default, fontSize = 24.sp, lineHeight = 30.sp, fontWeight = FontWeight.Bold, letterSpacing = (-0.02).sp)
    val DisplaySmall = TextStyle(fontFamily = Default, fontSize = 30.sp, lineHeight = 36.sp, fontWeight = FontWeight.Bold, letterSpacing = (-0.02).sp)
    val Display = TextStyle(fontFamily = Default, fontSize = 36.sp, lineHeight = 40.sp, fontWeight = FontWeight.Bold, letterSpacing = (-0.02).sp)
    val Hero = TextStyle(fontFamily = Default, fontSize = 48.sp, lineHeight = 50.sp, fontWeight = FontWeight.Bold, letterSpacing = (-0.03).sp)
    val Eyebrow = TextStyle(fontFamily = Default, fontSize = 12.sp, fontWeight = FontWeight.Bold, letterSpacing = 2.4.sp)
}

/* ----------------------------- Shape & spacing ---------------------------- */

object LustraRadius {
    val Control = 16.dp
    val Card = 24.dp
    val Sheet = 32.dp
    val Hero = 40.dp
    val Pill = 999.dp
}

object LustraSpacing {
    val ScreenPadding = 20.dp
    val CardPadding = 28.dp
    val SectionGap = 96.dp
}

object LustraMotion {
    const val Micro = 150
    const val Control = 250
    const val Entrance = 700
    const val StaggerStep = 80
    // Easing: use CubicBezierEasing(0.21f, 0.6f, 0.35f, 1f) for all entrances.
}

/* ------------------------------- Components ------------------------------- */

@Composable
fun LustraPrimaryButton(text: String, onClick: () -> Unit, modifier: Modifier = Modifier) {
    Button(
        onClick = onClick,
        modifier = modifier
            .fillMaxWidth()
            .height(52.dp)
            .background(LustraCtaGradient, RoundedCornerShape(LustraRadius.Pill)),
        colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
        shape = RoundedCornerShape(LustraRadius.Pill),
    ) {
        Text(text, style = LustraType.TitleSmall, color = Color.White)
    }
}
