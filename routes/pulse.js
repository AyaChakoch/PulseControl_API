const express = require("express");
const router = express.Router();

const BPM_MIN = 45;
const BPM_MAX = 220;

function classify(bpm) {
    if (bpm < 60) return { category: "low", message: "Low pulse.", recommendation: "Rest a bit and re-check if needed." };
    if (bpm <= 100) return { category: "normal", message: "Normal pulse.", recommendation: "Continue as usual / try a short breathing exercise if you want." };
    return { category: "high", message: "High pulse.", recommendation: "Take a short pause and relax; re-measure after 1–2 minutes." };
}

router.post("/analyze", (req, res) => {
    const { bpm } = req.body;

    if (typeof bpm !== "number" || !Number.isFinite(bpm) || bpm < BPM_MIN || bpm > BPM_MAX) {
        return res.status(400).json({
            errorCode: "INVALID_BPM",
            message: "Invalid bpm. Please re-measure with your finger covering the camera and keep still."
        });
    }

    return res.json({ bpm, ...classify(bpm) });
});

module.exports = router;
