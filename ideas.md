* Base sprite is mostly color and texture, devoid of shading/highlighting
* **Normal map** uses **Hue** for surface direction *(0-360 degrees)* and **Value** for angle *(100 for vertical)*
  * Use saturation for dullness/shininess?
  * Normal map can be stored as Uint8
    * 3 bits for direction, 3 bits for angle
* Shading and highlights are applied dynamically based on 3D position of light source
  * Each pixel has its lighting calculated based on its direction and angle
  * Light color mixed with base pixel color
* Ambient light
  * Illuminates surfaces completely opposite of light source(s)
  * Has Brightness/Color
* Keep low color depth for final result after calculating pixel colors?
  * Add some noise?