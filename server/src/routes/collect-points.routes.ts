import { Router, RequestHandler } from 'express';
import { CollectPointType } from '../types/collect-points.types';
import collectPointsService from '../domains/collect-points/collect-points.service';

const router = Router();

const getAllCollectPoints: RequestHandler = async (req, res) => {
  try {
    const { type, cityId, page, limit } = req.query;
    
    const params: {
      type?: CollectPointType;
      cityId?: number;
      page?: number;
      limit?: number;
    } = {};

    if (type) {
      if (!['collect_point', 'purchase_point', 'repairer'].includes(type as string)) {
        res.status(400).json({ error: 'Invalid type parameter' });
        return;
      }
      params.type = type as CollectPointType;
    }

    if (cityId) {
      const cityIdNum = parseInt(cityId as string);
      if (isNaN(cityIdNum) || cityIdNum <= 0) {
        res.status(400).json({ error: 'Invalid city ID' });
        return;
      }
      params.cityId = cityIdNum;
    }

    if (page) {
      const pageNum = parseInt(page as string);
      if (isNaN(pageNum) || pageNum <= 0) {
        res.status(400).json({ error: 'Invalid page number' });
        return;
      }
      params.page = pageNum;
    }

    if (limit) {
      const limitNum = parseInt(limit as string);
      if (isNaN(limitNum) || limitNum <= 0) {
        res.status(400).json({ error: 'Invalid limit number' });
        return;
      }
      params.limit = limitNum;
    }

    const result = await collectPointsService.getAll(params);
    res.json(result);
  } catch (error) {
    console.error('Error getting collect points:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCollectPointById: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    const point = await collectPointsService.getById(id);
    if (!point) {
      res.status(404).json({ error: 'Collect point not found' });
      return;
    }

    res.json(point);
  } catch (error) {
    console.error('Error getting collect point:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createCollectPoint: RequestHandler = async (req, res) => {
  try {
    const point = await collectPointsService.create(req.body);
    res.status(201).json(point);
  } catch (error) {
    console.error('Error creating collect point:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCollectPoint: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    const point = await collectPointsService.update(id, req.body);
    if (!point) {
      res.status(404).json({ error: 'Collect point not found' });
      return;
    }

    res.json(point);
  } catch (error) {
    console.error('Error updating collect point:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCollectPoint: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    const success = await collectPointsService.remove(id);
    if (!success) {
      res.status(404).json({ error: 'Collect point not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting collect point:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

router.get('/', getAllCollectPoints);
router.get('/:id', getCollectPointById);
router.post('/', createCollectPoint);
router.put('/:id', updateCollectPoint);
router.delete('/:id', deleteCollectPoint);

export default router;
