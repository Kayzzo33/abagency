const fs = require('fs');

try {
  const file = fs.readFileSync('public/models/apple_iphone_14_pro.glb');
  const MAGIC = file.readUInt32LE(0);
  if (MAGIC !== 0x46546C67) {
    console.log("Not a GLB file");
    process.exit(1);
  }
  const jsonLength = file.readUInt32LE(12);
  const jsonString = file.toString('utf8', 20, 20 + jsonLength);
  const gltf = JSON.parse(jsonString);
  const meshes = gltf.meshes.map((m, i) => i + ': ' + m.name);
  const materials = gltf.materials.map((m, i) => i + ': ' + m.name);
  const materialsWithMaps = gltf.materials.filter(m => m.pbrMetallicRoughness && m.pbrMetallicRoughness.baseColorTexture).map(m => m.name);
  fs.writeFileSync('gltf_info.json', JSON.stringify({meshes, materials, materialsWithMaps}, null, 2));
  console.log("Extracted gltf_info.json");
} catch (err) {
  console.error("Error reading glb:", err);
}
