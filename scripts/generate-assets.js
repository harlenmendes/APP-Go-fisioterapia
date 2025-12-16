const fs = require('fs');
const path = require('path');

// Este script usa sharp para converter SVG para PNG
// Instale as dependências: npm install sharp --save-dev

async function generateAssets() {
  try {
    const sharp = require('sharp');
    const svgPath = path.join(__dirname, '../assets/Logo.svg');
    const assetsDir = path.join(__dirname, '../assets');

    // Verifica se o SVG existe
    if (!fs.existsSync(svgPath)) {
      console.error('❌ Logo.svg não encontrado em assets/');
      process.exit(1);
    }

    console.log('🔄 Gerando assets a partir do Logo.svg...\n');

    // Cores do tema para o fundo
    const primaryColor = '#1b3a4b';
    const backgroundColor = '#1b3a4b';

    // 1. Icon.png - 1024x1024
    console.log('📱 Gerando icon.png (1024x1024)...');
    await sharp(svgPath)
      .resize(1024, 1024, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(assetsDir, 'icon.png'));
    console.log('✅ icon.png criado!\n');

    // 2. Splash.png - 1242x2436 (com fundo colorido)
    console.log('🎨 Gerando splash.png (1242x2436)...');
    const splashBackground = await sharp({
      create: {
        width: 1242,
        height: 2436,
        channels: 4,
        background: backgroundColor
      }
    }).png();

    const splashLogo = await sharp(svgPath)
      .resize(600, 600, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toBuffer();

    await splashBackground
      .composite([{
        input: splashLogo,
        top: Math.floor((2436 - 600) / 2),
        left: Math.floor((1242 - 600) / 2)
      }])
      .toFile(path.join(assetsDir, 'splash.png'));
    console.log('✅ splash.png criado!\n');

    // 3. Adaptive-icon.png - 1024x1024 (com fundo)
    console.log('🤖 Gerando adaptive-icon.png (1024x1024)...');
    const adaptiveBackground = await sharp({
      create: {
        width: 1024,
        height: 1024,
        channels: 4,
        background: primaryColor
      }
    }).png();

    const adaptiveLogo = await sharp(svgPath)
      .resize(800, 800, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toBuffer();

    await adaptiveBackground
      .composite([{
        input: adaptiveLogo,
        top: Math.floor((1024 - 800) / 2),
        left: Math.floor((1024 - 800) / 2)
      }])
      .toFile(path.join(assetsDir, 'adaptive-icon.png'));
    console.log('✅ adaptive-icon.png criado!\n');

    // 4. Favicon.png - 48x48 (opcional)
    console.log('🌐 Gerando favicon.png (48x48)...');
    await sharp(svgPath)
      .resize(48, 48, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(assetsDir, 'favicon.png'));
    console.log('✅ favicon.png criado!\n');

    console.log('🎉 Todos os assets foram gerados com sucesso!');
    console.log('\n📁 Arquivos criados em assets/:');
    console.log('   - icon.png (1024x1024)');
    console.log('   - splash.png (1242x2436)');
    console.log('   - adaptive-icon.png (1024x1024)');
    console.log('   - favicon.png (48x48)');

  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('❌ Erro: sharp não está instalado.');
      console.log('\n💡 Execute: npm install sharp --save-dev');
      console.log('   E depois execute: node scripts/generate-assets.js\n');
    } else {
      console.error('❌ Erro ao gerar assets:', error.message);
    }
    process.exit(1);
  }
}

generateAssets();




