import { Mistral } from '@mistralai/mistralai';

const mistralClient = new Mistral({apiKey: process.env.NEXT_PUBLIC_MISTRAL_API_KEY || ''});

interface DeviceRepairRequest {
  deviceType: string;
  condition: string;
  issues: string;
}

export async function getDeviceRepairAdvice({ deviceType, condition, issues }: DeviceRepairRequest) {

const prompt = `Tu es un expert en réparation d’appareils électroniques. Fournis un diagnostic détaillé et des solutions adaptées.  
- Formate ta réponse en **Markdown** avec des titres (##), des listes (-), du texte en gras (**) et en *italique*.  
- Si l'information est incertaine, précise-le.  
- Si aucune solution DIY n'existe, oriente vers un professionnel avec une estimation de coût.  

### **Informations de l’appareil**
- **Type d'appareil**: ${deviceType}  
- **État actuel**: ${condition}  
- **Problèmes signalés**: ${issues}  

### **Diagnostic**  
[Ton analyse détaillée avec symptômes similaires connus]  

### **Solutions DIY & Conseils**  
- [Solution 1 avec source]  
- [Solution 2 avec source]  
- [Alternative si aucune solution directe]  

### **Services Professionnels**  
[Suggestions de réparateurs et estimation des coûts]  

### **Conclusion & Recommandation**  
[Réparation ou remplacement conseillé]  

### **Sources & Références**  
- [Liste des sources fiables]  
- [Guides techniques pertinents]  
- [Forums d'experts]  
`;


  try {
    const chatResponse = await mistralClient.chat.complete({
      model: "mistral-medium",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      maxTokens: 1000,
    }) as { choices: Array<{ message: { content: string } }> };

    return {
      success: true,
      response: chatResponse.choices[0]?.message?.content || 'No response generated'
    };
  } catch (error) {
    console.error('Mistral API Error:', error);
    return {
      success: false,
      error: 'Failed to get AI response'
    };
  }
}
