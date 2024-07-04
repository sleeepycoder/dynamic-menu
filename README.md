
// npm install
// npm start

Logic:
Maps through an array of items.
Checks if an item has children (item.children && item.children.length > 0):
If true, renders a SubMenu with its children recursively rendered.
If false, renders a MenuItem.
Determines if an item should display an icon based on its type ('Image' or other).


Maps through menuData to render each top-level menu item (item):
Checks if item has children to decide whether to render a SubMenu or MenuItem.
Passes item.children to renderMenuItems recursively for rendering nested menu items.