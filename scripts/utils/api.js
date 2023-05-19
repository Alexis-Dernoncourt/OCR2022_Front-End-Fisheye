/* eslint-disable no-unused-vars */

/**
 * Fonction utilitaire de récupération des données de tous les photographes.
 * @returns
 */
async function getPhotographers() {
  try {
    const data = await fetch('./data/photographers.json');
    if (!data.ok) {
      throw new Error(`code ${data.status}: ${data.statusText}`);
    }
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
