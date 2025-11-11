type RGB = { r: number; g: number; b: number }
type CMYK = { c: number; m: number; y: number; k: number }

const HEX_REGEX = /^#(?:[0-9a-f]{3,8})$/i
const RGB_REGEX = /rgba?\(([^)]+)\)/i
const BLACK_THRESHOLD = 0.14

function hexToRGB(hex: string): RGB | null {
    const cleanHex = hex.slice(1)

    if (cleanHex.length === 3) {
        return {
            r: parseInt(cleanHex[0] + cleanHex[0], 16),
            g: parseInt(cleanHex[1] + cleanHex[1], 16),
            b: parseInt(cleanHex[2] + cleanHex[2], 16),
        }
    }

    if (cleanHex.length === 6 || cleanHex.length === 8) {
        return {
            r: parseInt(cleanHex.slice(0, 2), 16),
            g: parseInt(cleanHex.slice(2, 4), 16),
            b: parseInt(cleanHex.slice(4, 6), 16),
        }
    }

    return null
}

function rgbStringToRGB(rgbString: string): RGB | null {
    const match = rgbString.match(RGB_REGEX)
    if (!match) return null

    const [r, g, b] = match[1]
        .split(',')
        .map((s) => Number(s.trim()) || 0)
        .slice(0, 3)

    return { r, g, b }
}

export function parseColorToRGB(color: string): RGB | null {
    if (HEX_REGEX.test(color)) {
        return hexToRGB(color)
    }

    return rgbStringToRGB(color)
}

export function getContrastingTextColor(bgColor: string): string {
    const rgb = parseColorToRGB(bgColor)
    if (!rgb) return '#000'

    const { r, g, b } = rgb
    const srgb = [r, g, b].map((c) => {
        const v = c / 255
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })

    const luminance = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2]
    return luminance > BLACK_THRESHOLD ? '#000' : '#fff'
}

export function rgbToCmyk(r: number, g: number, b: number): CMYK {
    const rn = r / 255
    const gn = g / 255
    const bn = b / 255

    const k = 1 - Math.max(rn, gn, bn)
    if (k >= 1) return { c: 0, m: 0, y: 0, k: 100 }

    return {
        c: Math.round(((1 - rn - k) / (1 - k)) * 100),
        m: Math.round(((1 - gn - k) / (1 - k)) * 100),
        y: Math.round(((1 - bn - k) / (1 - k)) * 100),
        k: Math.round(k * 100),
    }
}

export function padNumber(value: number, max: number, length: number = 3): string {
    return String(Math.max(0, Math.min(max, Math.round(value)))).padStart(length, '0')
}

export function formatRGB(rgb: RGB): string {
    return `RGB: ${padNumber(rgb.r, 255)}/${padNumber(rgb.g, 255)}/${padNumber(rgb.b, 255)}`
}

export function formatCMYK(cmyk: CMYK): string {
    return `CMYK: ${padNumber(cmyk.c, 100, 2)}/${padNumber(cmyk.m, 100, 2)}/${padNumber(cmyk.y, 100, 2)}/${padNumber(cmyk.k, 100, 2)}`
}
