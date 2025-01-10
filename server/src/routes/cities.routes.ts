import { Router } from "express";
import citiesService from "../domains/cities/cities.service";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const cities = await citiesService.getAllCities();
    res.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid city ID" });
    }

    const city = await citiesService.getCityById(id);
    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    res.json(city);
  } catch (error) {
    console.error("Error fetching city:", error);
    res.status(500).json({ error: "Failed to fetch city" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, coordinates } = req.body;

    if (!name || !coordinates) {
      return res.status(400).json({ error: "Name and coordinates are required" });
    }

    const city = await citiesService.createCity({ name, coordinates });
    res.status(201).json(city);
  } catch (error) {
    console.error("Error creating city:", error);
    res.status(500).json({ error: "Failed to create city" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid city ID" });
    }

    const updates = req.body;
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }

    const city = await citiesService.updateCity(id, updates);
    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    res.json(city);
  } catch (error) {
    console.error("Error updating city:", error);
    res.status(500).json({ error: "Failed to update city" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid city ID" });
    }

    const success = await citiesService.deleteCity(id);
    if (!success) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).json({ error: "Failed to delete city" });
  }
});

export default router;
