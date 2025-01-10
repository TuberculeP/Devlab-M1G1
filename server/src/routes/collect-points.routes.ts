import { Router } from 'express';
import { CollectPointType } from '../types/collect-points.types';
import collectPointsService from '../domains/collect-points/collect-points.service';

const router = Router();

router.get('/', async (req, res) => {
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
        return res.status(400).json({ error: 'Invalid type parameter' });
      }
      params.type = type as CollectPointType;
    }

    if (cityId) {
      const cityIdNum = parseInt(cityId as string);
      if (isNaN(cityIdNum) || cityIdNum <= 0) {
        return res.status(400).json({ error: 'Invalid city ID' });
      }
      params.cityId = cityIdNum;
    }

    if (page) {
      const pageNum = parseInt(page as string);
      if (isNaN(pageNum) || pageNum <= 0) {
        return res.status(400).json({ error: 'Invalid page number' });
      }
      params.page = pageNum;
    }

    if (limit) {
      const limitNum = parseInt(limit as string);
      if (isNaN(limitNum) || limitNum <= 0) {
        return res.status(400).json({ error: 'Invalid limit number' });
      }
      params.limit = limitNum;
    }

    const result = await collectPointsService.getAll(params);
    res.json(result);
  } catch (error) {
    console.error('Error getting collect points:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const point = await collectPointsService.getById(id);
    if (!point) {
      return res.status(404).json({ error: 'Collect point not found' });
    }

    res.json(point);
  } catch (error) {
    console.error('Error getting collect point:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const point = await collectPointsService.create(req.body);
    res.status(201).json(point);
  } catch (error) {
    console.error('Error creating collect point:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const point = await collectPointsService.update(id, req.body);
    if (!point) {
      return res.status(404).json({ error: 'Collect point not found' });
    }

    res.json(point);
  } catch (error) {
    console.error('Error updating collect point:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const success = await collectPointsService.remove(id);
    if (!success) {
      return res.status(404).json({ error: 'Collect point not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting collect point:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
