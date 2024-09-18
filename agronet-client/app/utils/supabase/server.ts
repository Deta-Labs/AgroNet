import { createClient } from '@supabase/supabase-js'

interface Farm {
  id: number;
  created_at: string;
  district: string;
  state: string;
  country: string;
  farm_id: number;
  details: {
    Crops: string[];
  };
}

interface FarmData {
  id: number;
  created_at: string;
  soil_moisture: number;
  area_humidity: number;
  area_temp: number
}

// Create a single supabase client for interacting with your database
const supabase = createClient('https://dcruvxrmeudjrwsxaolg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjcnV2eHJtZXVkanJ3c3hhb2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY1MDM3MjUsImV4cCI6MjA0MjA3OTcyNX0.il4lDDpOY8SSB696EDRJcswMiVtCb0FwsxjPixwgv0I')

export async function GetFarms(): Promise<Farm[]> {
  const { data, error } = await supabase
    .from('farms')
    .select()

  if (error) {
    console.error("Error fetching farms:", error);
    return [];
  }

  return data as Farm[];
}

export async function GetFarmByID(id: string): Promise<Farm[]> {
  const { data, error } = await supabase
    .from('farms')
    .select('*')
    .eq('id', id)

  if (error) {
    console.error("Error fetching farms:", error);
    return [];
  }

  return data as Farm[];
}

export async function GetFarmData(id: string) {
  const { data, error } = await supabase
    .from(id)
    .select()

  if (error) {
    console.error("Error fetching farms:", error);
    return [];
  }

  console.log(data)

  return data as FarmData[];
}

