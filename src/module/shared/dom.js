const setTitle = title => (document.title = `Boxed · ${title}`);
const setHeading = heading => $('#gameTitle').text(heading);

export { setTitle, setHeading };
