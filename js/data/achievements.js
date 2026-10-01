/**
 * ACHIEVEMENTS DATA REPOSITORY
 * Single source of truth for all milestones, hackathons, and technical achievements.
 * Rendered with the same certificate-card UI as the certifications section.
 */

const achievementsData = [
  {
    id: "achievement-brain-byte",
    title: "BRAIN BYTE — 2nd Place",
    issuer: "Sri Ramakrishna Engineering College",
    badgeType: "srec",
    date: "March 26, 2024",
    credentialUrl: null,
    image: "assets/achievements/achievement-brain-byte-xtensis-2024-thumb.jpg",
    pdf: "assets/achievements/achievement-brain-byte-xtensis-2024.pdf",
    skills: ["Competitive Programming", "Problem Solving"],
    description: "Certificate of Appreciation for securing 2nd place in the BRAIN BYTE event at XTENSIS 2024, the state-level technical symposium of the Department of Information Technology, with a cash prize of Rs. 700."
  },
  {
    id: "achievement-srec-hackathon-winners",
    title: "SREC Hackathon 1.0 — Winners",
    issuer: "Sri Ramakrishna Engineering College",
    badgeType: "srec",
    date: "March 13–14, 2024",
    credentialUrl: null,
    image: "assets/achievements/achievement-srec-hackathon-winners-thumb.jpg",
    pdf: "assets/achievements/achievement-srec-hackathon-winners.pdf",
    skills: ["Hackathon", "Rapid Prototyping", "Pitching"],
    description: "Certificate of Recognition as Winners of the SREC Hackathon 1.0 for Domestic Applications — Final Pitch Day."
  },
  {
    id: "achievement-srec-hackathon-participant",
    title: "SREC Hackathon 1.0 — Finalist",
    issuer: "Sri Ramakrishna Engineering College",
    badgeType: "srec",
    date: "March 13–14, 2024",
    credentialUrl: null,
    image: "assets/achievements/achievement-srec-hackathon-participant-thumb.jpg",
    pdf: "assets/achievements/achievement-srec-hackathon-participant.pdf",
    skills: ["Hackathon", "Team Collaboration"],
    description: "Certificate of Participation in the SREC Hackathon 1.0 for Domestic Applications — Final Pitch Day."
  },
  {
    id: "achievement-crezils-2023",
    title: "TEAMSTER Contest — CREZILS 2023",
    issuer: "SREC Business School",
    badgeType: "srec",
    date: "April 5, 2023",
    credentialUrl: null,
    image: "assets/achievements/achievement-crezils-2023-teamster-thumb.jpg",
    pdf: "assets/achievements/achievement-crezils-2023-teamster.pdf",
    skills: ["Team Building", "Management Games"],
    description: "Certificate of Participation in the TEAMSTER contest at CREZILS 2023, the national-level management fest of SREC Business School."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = achievementsData;
}
