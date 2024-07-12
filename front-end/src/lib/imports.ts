"use server"
import path from 'path'
import fsPromises from "fs/promises"

export async function getPresets() {
    const filePath = path.join(process.cwd(), 'Presets.json');
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = await JSON.parse(jsonData.toString());
  
    return {
       objectData
    }
  }