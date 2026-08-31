document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('character.json');
    const data = await response.json();
    document.querySelectorAll('[data-character-name]').forEach(el => el.textContent = data.name);
    document.querySelectorAll('[data-character-age]').forEach(el => el.textContent = data.age);
  } catch (error) {
    console.warn('Character data could not be loaded.', error);
  }
});