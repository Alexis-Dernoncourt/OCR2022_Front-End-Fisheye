// Reusable function for fetching photographers data
async function getPhotographers() {
  try {
    const data = await fetch("./data/photographers.json");
    if (!data.ok) {
      throw new Error(`code ${data.status}: ${data.statusText}`);
    }
    const response = await data.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
