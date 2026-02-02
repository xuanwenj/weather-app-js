// check if the element exists in the DOM

function getElementById(id) {
  try {
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(`Element not found: ${id}`);
    }
    return element;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export { getElementById };
