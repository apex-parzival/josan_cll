import React from 'react'

export function ServiceIcon({ name, size = 44, className = '' }) {
  const style = { width: size, height: size, display: 'inline-block', verticalAlign: 'middle' }

  switch (name) {
    case 'artificial-grass-installation-turf':
    case 'Artificial Grass & Turf':
    case 'Artificial Grass / Turf':
      // Turf Grass Blades & Turf Base
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="6" y="34" width="36" height="8" rx="3" fill="#15803d" />
          <path d="M12 34C10 24 6 18 6 12C12 16 16 22 18 34" fill="#22c55e" />
          <path d="M22 34C20 20 16 14 16 8C22 13 26 20 28 34" fill="#16a34a" />
          <path d="M32 34C30 22 26 16 26 10C32 15 36 21 38 34" fill="#4ade80" />
          <path d="M42 34C40 26 36 22 36 16C40 20 42 26 43 34" fill="#15803d" />
        </svg>
      )

    case 'deck-building-services':
    case 'decking':
    case 'Deck Building':
    case 'Deck Building Services':
    case 'Decking':
      // Wooden Decking Planks with Joists & Screws
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="6" y="8" width="36" height="6" rx="2" fill="#b45309" />
          <rect x="6" y="17" width="36" height="6" rx="2" fill="#d97706" />
          <rect x="6" y="26" width="36" height="6" rx="2" fill="#b45309" />
          <rect x="6" y="35" width="36" height="6" rx="2" fill="#92400e" />
          <circle cx="10" cy="11" r="1" fill="#78350f" />
          <circle cx="38" cy="11" r="1" fill="#78350f" />
          <circle cx="10" cy="20" r="1" fill="#78350f" />
          <circle cx="38" cy="20" r="1" fill="#78350f" />
          <circle cx="10" cy="29" r="1" fill="#78350f" />
          <circle cx="38" cy="29" r="1" fill="#78350f" />
        </svg>
      )

    case 'patios':
    case 'Patios':
    case "Patio's":
      // Stone Paver Patio Pattern
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="6" y="6" width="16" height="16" rx="3" fill="#64748b" />
          <rect x="26" y="6" width="16" height="16" rx="3" fill="#94a3b8" />
          <rect x="6" y="26" width="16" height="16" rx="3" fill="#475569" />
          <rect x="26" y="26" width="16" height="16" rx="3" fill="#64748b" />
          <path d="M6 14H22M26 14H42M14 6V22M34 6V22M6 34H22M26 34H42M14 26V42M34 26V42" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    case 'fencing-services':
    case 'Fencing Services':
      // Wooden Picket Fence
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M8 14L12 8L16 14V42H8V14Z" fill="#d97706" />
          <path d="M20 14L24 8L28 14V42H20V14Z" fill="#b45309" />
          <path d="M32 14L36 8L40 14V42H32V14Z" fill="#d97706" />
          <rect x="4" y="18" width="40" height="5" fill="#92400e" />
          <rect x="4" y="32" width="40" height="5" fill="#92400e" />
        </svg>
      )

    case 'basement-renovations':
    case 'basement-renovation':
    case 'Basement Renovations':
    case 'Basement Renovation':
    case 'New Basement Construction':
    case 'new-basement-construction':
      // Lower Home Basement Living Suite Structure
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M6 22L24 6L42 22V42H6V22Z" fill="#0f172a" opacity="0.1" />
          <path d="M4 22L24 6L44 22" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="8" y="24" width="32" height="18" rx="2" fill="#3b82f6" />
          <rect x="14" y="28" width="8" height="8" rx="1" fill="#93c5fd" />
          <rect x="26" y="28" width="8" height="8" rx="1" fill="#93c5fd" />
          <rect x="21" y="34" width="6" height="8" fill="#1d4ed8" />
        </svg>
      )

    case 'sod':
    case 'Sod Installation':
      // Rolled Sod & Fresh Lawn Layer
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M6 36C6 30 14 30 24 30C34 30 42 30 42 36C42 40 34 42 24 42C14 42 6 40 6 36Z" fill="#15803d" />
          <path d="M8 34C8 20 18 16 28 20C38 24 40 34 40 34" fill="#22c55e" />
          <path d="M12 28C10 20 16 12 24 16C32 20 36 28 36 28" fill="#4ade80" />
          <circle cx="16" cy="22" r="3" fill="#86efac" />
        </svg>
      )

    case 'retaining-walls':
    case 'Retaining Walls':
      // Tiered Stone Retaining Wall
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="6" y="32" width="36" height="10" rx="2" fill="#475569" />
          <rect x="10" y="20" width="32" height="10" rx="2" fill="#64748b" />
          <rect x="16" y="8" width="26" height="10" rx="2" fill="#94a3b8" />
          <path d="M18 32V42M30 32V42M20 20V30M32 20V30M28 8V18" stroke="#cbd5e1" strokeWidth="1.5" />
        </svg>
      )

    case 'pergola-services':
    case 'Pergola':
      // Timber Pergola Beam Rafter Structure
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="10" y="16" width="4" height="26" rx="1" fill="#78350f" />
          <rect x="34" y="16" width="4" height="26" rx="1" fill="#78350f" />
          <rect x="4" y="12" width="40" height="5" rx="2" fill="#b45309" />
          <rect x="8" y="6" width="4" height="12" rx="1" fill="#d97706" />
          <rect x="18" y="6" width="4" height="12" rx="1" fill="#d97706" />
          <rect x="26" y="6" width="4" height="12" rx="1" fill="#d97706" />
          <rect x="36" y="6" width="4" height="12" rx="1" fill="#d97706" />
        </svg>
      )

    case 'bobcat-service':
    case 'Bobcat Service':
      // Skid Steer Loader / Excavator Bucket
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="14" cy="38" r="6" fill="#1e293b" />
          <circle cx="14" cy="38" r="3" fill="#cbd5e1" />
          <circle cx="30" cy="38" r="6" fill="#1e293b" />
          <circle cx="30" cy="38" r="3" fill="#cbd5e1" />
          <rect x="8" y="32" width="28" height="8" fill="#334155" />
          <path d="M10 32L14 16H28L34 32H10Z" fill="#eab308" />
          <path d="M30 24L42 20V34L36 38" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case 'trees':
    case 'Trees & Lot Gardening':
    case 'Trees':
    case 'Lot Gardening':
    case 'lot-gardening':
      // Evergreen & Landscaping Trees
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="22" y="30" width="4" height="14" rx="1" fill="#78350f" />
          <path d="M24 4L10 20H38L24 4Z" fill="#15803d" />
          <path d="M24 12L12 28H36L24 12Z" fill="#16a34a" />
          <path d="M24 18L14 34H34L24 18Z" fill="#22c55e" />
        </svg>
      )

    case 'railing':
    case 'Railing & Gates':
    case 'Railing':
      // Architectural Deck Railing
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="4" y="10" width="40" height="4" rx="1" fill="#1e293b" />
          <rect x="4" y="36" width="40" height="4" rx="1" fill="#1e293b" />
          <rect x="6" y="10" width="4" height="30" fill="#334155" />
          <rect x="40" y="10" width="4" height="30" fill="#334155" />
          <line x1="15" y1="14" x2="15" y2="36" stroke="#64748b" strokeWidth="2.5" />
          <line x1="24" y1="14" x2="24" y2="36" stroke="#64748b" strokeWidth="2.5" />
          <line x1="33" y1="14" x2="33" y2="36" stroke="#64748b" strokeWidth="2.5" />
        </svg>
      )

    case 'painting-service':
    case 'Painting Service':
      // Paint Roller with Fresh Paint Stroke
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="12" y="6" width="24" height="10" rx="3" fill="#3b82f6" />
          <path d="M36 11H40V24H26V30" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="23" y="30" width="6" height="14" rx="2" fill="#1e293b" />
          <path d="M6 10C6 10 10 14 12 14" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )

    case 'flower-bed':
    case 'Flower Bed':
      // Flower Garden Bed
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="6" y="34" width="36" height="8" rx="2" fill="#78350f" />
          <circle cx="16" cy="18" r="6" fill="#ec4899" />
          <circle cx="16" cy="18" r="2.5" fill="#fef08a" />
          <line x1="16" y1="24" x2="16" y2="34" stroke="#22c55e" strokeWidth="3" />
          <circle cx="32" cy="18" r="6" fill="#a855f7" />
          <circle cx="32" cy="18" r="2.5" fill="#fef08a" />
          <line x1="32" y1="24" x2="32" y2="34" stroke="#22c55e" strokeWidth="3" />
        </svg>
      )

    case 'framing-service':
    case 'Framing Service':
      // Timber Wall Framing Studs
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="6" y="6" width="36" height="5" fill="#b45309" />
          <rect x="6" y="37" width="36" height="5" fill="#b45309" />
          <rect x="8" y="11" width="5" height="26" fill="#d97706" />
          <rect x="21" y="11" width="5" height="26" fill="#d97706" />
          <rect x="35" y="11" width="5" height="26" fill="#d97706" />
          <line x1="13" y1="11" x2="35" y2="37" stroke="#92400e" strokeWidth="3" />
        </svg>
      )

    case 'garage':
    case 'Garage':
    case 'Garage Construction':
      // Garage Building with Panel Door
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M4 20L24 6L44 20" stroke="#334155" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="8" y="20" width="32" height="22" rx="1" fill="#475569" />
          <rect x="12" y="24" width="24" height="18" fill="#94a3b8" />
          <line x1="12" y1="29" x2="36" y2="29" stroke="#475569" strokeWidth="1.5" />
          <line x1="12" y1="34" x2="36" y2="34" stroke="#475569" strokeWidth="1.5" />
          <line x1="12" y1="39" x2="36" y2="39" stroke="#475569" strokeWidth="1.5" />
        </svg>
      )

    case 'gate-building':
    case 'Gate Building':
      // Wooden Entry Gate
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="6" y="8" width="5" height="34" fill="#78350f" />
          <rect x="37" y="8" width="5" height="34" fill="#78350f" />
          <rect x="11" y="12" width="26" height="26" fill="#b45309" />
          <line x1="11" y1="12" x2="37" y2="38" stroke="#78350f" strokeWidth="3" />
          <circle cx="32" cy="25" r="2.5" fill="#1e293b" />
        </svg>
      )

    case 'gazebo':
    case 'Gazebo':
      // Pavilion Gazebo
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M24 4L6 16H42L24 4Z" fill="#b45309" />
          <rect x="10" y="16" width="4" height="24" fill="#d97706" />
          <rect x="34" y="16" width="4" height="24" fill="#d97706" />
          <rect x="22" y="16" width="4" height="24" fill="#92400e" />
          <rect x="6" y="40" width="36" height="4" fill="#78350f" />
        </svg>
      )

    case 'professional-home-renovation':
    case 'Home Renovation':
      // Home Renovation & Remodeling
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M6 22L24 6L42 22V42H6V22Z" fill="#1e293b" />
          <rect x="16" y="26" width="16" height="16" rx="1" fill="#38bdf8" />
          <path d="M34 10L38 6M38 6L42 10M38 6V16" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case 'kitchen-service':
    case 'Kitchen Service':
    case 'Kitchen Remodeling':
      // Modern Kitchen Stove & Cabinets
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="8" y="10" width="32" height="32" rx="3" fill="#334155" />
          <rect x="12" y="14" width="24" height="12" rx="2" fill="#475569" />
          <circle cx="18" cy="20" r="3" fill="#ea580c" />
          <circle cx="30" cy="20" r="3" fill="#ea580c" />
          <rect x="12" y="30" width="24" height="10" rx="1" fill="#1e293b" />
        </svg>
      )

    case 'rock':
    case 'Rock':
    case 'Rock Landscaping':
      // Decorative Landscaping Boulders & River Rocks
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M8 38C6 28 14 20 24 20C34 20 42 26 40 38H8Z" fill="#64748b" />
          <path d="M4 42C4 36 10 32 18 32C26 32 30 38 28 42H4Z" fill="#94a3b8" />
          <path d="M22 42C22 34 28 30 36 30C44 30 46 38 44 42H22Z" fill="#475569" />
        </svg>
      )

    default:
      // General Landscaping & Construction Icon
      return (
        <svg style={style} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M12 36L24 8L36 36H12Z" fill="#15803d" />
          <rect x="20" y="28" width="8" height="16" fill="#b45309" />
        </svg>
      )
  }
}
