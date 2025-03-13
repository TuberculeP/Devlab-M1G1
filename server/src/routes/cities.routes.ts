import { Router, RequestHandler } from "express";
import citiesService from "../domains/cities/cities.service";

const router = Router();

const getAllCities: RequestHandler = async (req, res) => {
  try {
    const cities = await citiesService.getAllCities();
    res.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
};

const getCityById: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid city ID" });
      return;
    }

    const city = await citiesService.getCityById(id);
    if (!city) {
      res.status(404).json({ error: "City not found" });
      return;
    }

    res.json(city);
  } catch (error) {
    console.error("Error fetching city:", error);
    res.status(500).json({ error: "Failed to fetch city" });
  }
};

const createCity: RequestHandler = async (req, res) => {
  try {
    const { name, coordinates } = req.body;

    if (!name || !coordinates) {
      res.status(400).json({ error: "Name and coordinates are required" });
      return;
    }

    const city = await citiesService.createCity({ name, coordinates });
    res.status(201).json(city);
  } catch (error) {
    console.error("Error creating city:", error);
    res.status(500).json({ error: "Failed to create city" });
  }
};

const updateCity: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid city ID" });
      return;
    }

    const updates = req.body;
    if (Object.keys(updates).length === 0) {
      res.status(400).json({ error: "No update data provided" });
      return;
    }

    const city = await citiesService.updateCity(id, updates);
    if (!city) {
      res.status(404).json({ error: "City not found" });
      return;
    }

    res.json(city);
  } catch (error) {
    console.error("Error updating city:", error);
    res.status(500).json({ error: "Failed to update city" });
  }
};

const deleteCity: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid city ID" });
      return;
    }

    const success = await citiesService.deleteCity(id);
    if (!success) {
      res.status(404).json({ error: "City not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).json({ error: "Failed to delete city" });
  }
};

router.get("/", getAllCities);
router.get("/:id", getCityById);
router.post("/", createCity);
router.put("/:id", updateCity);
router.delete("/:id", deleteCity);

export default router;
