
// commonServices.ts
const API_BASE_URL = 'https://intranet.radgov.com/RadgovWebsiteAPI/API';

export interface State {
  State: string;
}

export const getStatesByCountry = async (): Promise<State[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/StateOnCountry?country=USA`);
    if (!response.ok) {
      throw new Error('Failed to fetch states');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching states:', error);
    return [];
  }
};

export const getSkills =async():Promise<{Skill:string}[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/GetSkillsSet`);
    if (!response.ok) {
      throw new Error('Failed to fetch skills');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
};