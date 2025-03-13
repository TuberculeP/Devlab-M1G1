'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { getDeviceRepairAdvice } from '@/utils/mistral';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { deviceCategories } from './data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DeviceRepair() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [condition, setCondition] = useState('');
  const [issues, setIssues] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const currentCategory = deviceCategories.find(cat => cat.category === selectedCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    
    try {
      const result = await getDeviceRepairAdvice({ deviceType, condition, issues });
      if (result.success) {
        const text = result.response;
        let currentText = '';
        const words = typeof text === 'string' ? text.split(' ') : [];
        
        for (let i = 0; i < words.length; i++) {
          currentText += words[i] + ' ';
          setResponse(currentText);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      } else {
        setResponse(result.error || 'Failed to get AI response');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to get AI response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl mt-12">
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Diagnostic et Réparation d&apos;Appareils</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie d&apos;appareil</Label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  setDeviceType(''); 
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {deviceCategories.map((category) => (
                    <SelectItem key={category.category} value={category.category}>
                      {category.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deviceType">Type d&apos;appareil</Label>
              <Select
                value={deviceType}
                onValueChange={setDeviceType}
                disabled={!selectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un appareil" />
                </SelectTrigger>
                <SelectContent>
                  {currentCategory?.devices.map((device) => (
                    <SelectItem key={device} value={device}>
                      {device}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condition">État actuel</Label>
              <Select
                value={condition}
                onValueChange={setCondition}
                disabled={!deviceType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le problème principal" />
                </SelectTrigger>
                <SelectContent>
                  {currentCategory?.commonIssues.map((issue) => (
                    <SelectItem key={issue} value={issue}>
                      {issue}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issues">Description détaillée des problèmes (optionnel)</Label>
              <Textarea
                id="issues"
                value={issues}
                onChange={(e) => setIssues(e.target.value)}
                placeholder="Ajoutez des détails supplémentaires sur le problème..."
                className="w-full min-h-[100px]"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading || !deviceType || !condition}
            >
              {loading ? 'Analyse en cours...' : 'Obtenir un diagnostic'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {(response || loading) && (
        <Card className="mt-8 overflow-hidden shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Diagnostic et Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && !response && (
              <div className="flex items-center justify-center p-4">
                <div className="animate-pulse">Analyse en cours...</div>
              </div>
            )}
            {response && (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => <h2 className="text-xl font-bold mt-6 mb-4 text-primary">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>,
                  p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="ml-2">{children}</li>,
                  strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  code: ({ children }) => <code className="px-1.5 py-0.5 bg-muted rounded text-sm">{children}</code>,
                  blockquote: ({ children }) => <blockquote className="pl-4 border-l-4 border-primary/30 italic my-4">{children}</blockquote>,
                  a: ({ href, children }) => <a href={href} className="text-blue-600 hover:underline">{children}</a>,
                }}
              >
                {response}
              </ReactMarkdown>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
