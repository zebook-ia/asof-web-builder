// Templates
const templates = {
    blank: '',
    asof: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASOF Newsletter</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
            --preto-profundo: #000000;
            --azul-escuro: #045495;
            --azul-claro: #76AEEA;
            --azul-pastel: #BAD7F7;
            --lavanda-neutra: #F3F3FC;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--preto-profundo);
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .email-container {
            max-width: 650px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(4, 84, 149, 0.1);
        }
        .header {
            background: linear-gradient(135deg, var(--azul-escuro) 0%, var(--azul-claro) 100%);
            color: white;
            padding: 30px 40px;
            text-align: center;
        }
        .header h1 {
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            font-size: 1.8em;
            margin-bottom: 5px;
        }
        .content {
            padding: 40px;
        }
        .highlight-box {
            background: var(--azul-pastel);
            border-left: 4px solid var(--azul-escuro);
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
        }
        .footer {
            background: var(--azul-escuro);
            color: white;
            padding: 25px 40px;
            text-align: center;
            font-size: 0.9em;
        }
        .btn-asof {
            background-color: var(--azul-escuro);
            color: white;
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>ASOF</h1>
            <p>Associação Nacional dos Oficiais de Chancelaria do Serviço Exterior Brasileiro</p>
        </div>
        <div class="content">
            <h2 style="color: var(--azul-escuro); margin-bottom: 20px;">Comunicado Importante</h2>
            <p>Prezados(as) Associados(as),</p>
            <p>Este é um template institucional da ASOF para comunicações oficiais. Personalize o conteúdo conforme necessário.</p>
            <div class="highlight-box">
                <strong>📢 Destaque:</strong> Use esta caixa para informações importantes e avisos especiais.
            </div>
            <p>Atenciosamente,<br>Diretoria ASOF</p>
            <div style="text-align: center;">
                <a href="http://www.asof.org.br" class="btn-asof">Acesse nosso site</a>
            </div>
        </div>
        <div class="footer">
            <p><strong>ASOF</strong> - Associação Nacional dos Oficiais de Chancelaria do Serviço Exterior Brasileiro</p>
            <p>Esplanada dos Ministérios, Bloco H, Anexo I – 1.º Subsolo – CEP: 70.170-900, Brasília/DF</p>
            <p>📞 (61) 2030-6040/6624/9028 | 📧 contato@asof.org.br | 🌐 www.asof.org.br</p>
        </div>
    </div>
</body>
</html>`,
    simple: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #f9f9f9;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #333;
            margin: 0;
        }
        .content {
            line-height: 1.6;
            color: #555;
        }
        .footer {
            border-top: 1px solid #eee;
            padding-top: 20px;
            margin-top: 20px;
            color: #888;
            font-size: 14px;
        }
        .btn {
            background: #007bff;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            display: inline-block;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Título do Email</h1>
            <p style="margin: 10px 0 0 0; color: #666;">Subtítulo ou data</p>
        </div>
        <div class="content">
            <p>Olá,</p>
            <p>Este é um template simples e limpo para seus emails. Personalize o conteúdo conforme necessário.</p>
            <p>Você pode adicionar:</p>
            <ul>
                <li>Listas de itens</li>
                <li>Links importantes</li>
                <li>Informações de contato</li>
            </ul>
            <a href="#" class="btn">Botão de Ação</a>
            <p>Atenciosamente,<br><strong>Sua Equipe</strong></p>
        </div>
        <div class="footer">
            <p>Este é um email automático. Para mais informações, visite nosso site.</p>
        </div>
    </div>
</body>
</html>`,
    corporate: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: #f8f9fa;
        }
        .container {
            max-width: 650px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.2em;
            font-weight: bold;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 1.1em;
        }
        .content {
            padding: 40px;
        }
        .content h2 {
            color: #333;
            border-bottom: 3px solid #007bff;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .cta {
            background: #007bff;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin: 20px 0;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .cta:hover {
            background: #0056b3;
        }
        .stats {
            display: flex;
            justify-content: space-around;
            margin: 30px 0;
            text-align: center;
        }
        .stat-item {
            flex: 1;
            padding: 20px;
        }
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #007bff;
        }
        .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #6c757d;
            border-top: 1px solid #dee2e6;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            color: #007bff;
            text-decoration: none;
            margin: 0 10px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Sua Empresa</h1>
            <p>Comunicado Corporativo Importante</p>
        </div>
        <div class="content">
            <h2>Resultados do Trimestre</h2>
            <p>Prezados(as) Stakeholders,</p>
            <p>Temos o prazer de compartilhar os excelentes resultados do último trimestre. Nossa empresa continua crescendo e inovando.</p>

            <div class="stats">
                <div class="stat-item">
                    <div class="stat-number">+25%</div>
                    <div>Crescimento</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">1.2M</div>
                    <div>Clientes</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">99.9%</div>
                    <div>Uptime</div>
                </div>
            </div>

            <p>Estamos comprometidos em continuar oferecendo o melhor serviço e produtos para nossos clientes.</p>

            <a href="#" class="cta">Ver Relatório Completo</a>

            <p>Obrigado pela confiança em nossa empresa.</p>
            <p><strong>Equipe Executiva</strong></p>
        </div>
        <div class="footer">
            <div class="social-links">
                <a href="#">LinkedIn</a>
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
                <a href="#">Website</a>
            </div>
            <p>© 2025 Sua Empresa. Todos os direitos reservados.</p>
            <p>Este email foi enviado para você como parte de nossa comunicação corporativa.</p>
        </div>
    </div>
</body>
</html>`
};

// Templates
const templates = {
    blank: '',
    asof: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASOF Newsletter</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
            --preto-profundo: #000000;
            --azul-escuro: #045495;
            --azul-claro: #76AEEA;
            --azul-pastel: #BAD7F7;
            --lavanda-neutra: #F3F3FC;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--preto-profundo);
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .email-container {
            max-width: 650px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(4, 84, 149, 0.1);
        }
        .header {
            background: linear-gradient(135deg, var(--azul-escuro) 0%, var(--azul-claro) 100%);
            color: white;
            padding: 30px 40px;
            text-align: center;
        }
        .header h1 {
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            font-size: 1.8em;
            margin-bottom: 5px;
        }
        .content {
            padding: 40px;
        }
        .highlight-box {
            background: var(--azul-pastel);
            border-left: 4px solid var(--azul-escuro);
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
        }
        .footer {
            background: var(--azul-escuro);
            color: white;
            padding: 25px 40px;
            text-align: center;
            font-size: 0.9em;
        }
        .btn-asof {
            background-color: var(--azul-escuro);
            color: white;
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>ASOF</h1>
            <p>Associação Nacional dos Oficiais de Chancelaria do Serviço Exterior Brasileiro</p>
        </div>
        <div class="content">
            <h2 style="color: var(--azul-escuro); margin-bottom: 20px;">Comunicado Importante</h2>
            <p>Prezados(as) Associados(as),</p>
            <p>Este é um template institucional da ASOF para comunicações oficiais. Personalize o conteúdo conforme necessário.</p>
            <div class="highlight-box">
                <strong>📢 Destaque:</strong> Use esta caixa para informações importantes e avisos especiais.
            </div>
            <p>Atenciosamente,<br>Diretoria ASOF</p>
            <div style="text-align: center;">
                <a href="http://www.asof.org.br" class="btn-asof">Acesse nosso site</a>
            </div>
        </div>
        <div class="footer">
            <p><strong>ASOF</strong> - Associação Nacional dos Oficiais de Chancelaria do Serviço Exterior Brasileiro</p>
            <p>Esplanada dos Ministérios, Bloco H, Anexo I – 1.º Subsolo – CEP: 70.170-900, Brasília/DF</p>
            <p>📞 (61) 2030-6040/6624/9028 | 📧 contato@asof.org.br | 🌐 www.asof.org.br</p>
        </div>
    </div>
</body>
</html>`,
    simple: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #f9f9f9;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #333;
            margin: 0;
        }
        .content {
            line-height: 1.6;
            color: #555;
        }
        .footer {
            border-top: 1px solid #eee;
            padding-top: 20px;
            margin-top: 20px;
            color: #888;
            font-size: 14px;
        }
        .btn {
            background: #007bff;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            display: inline-block;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Título do Email</h1>
            <p style="margin: 10px 0 0 0; color: #666;">Subtítulo ou data</p>
        </div>
        <div class="content">
            <p>Olá,</p>
            <p>Este é um template simples e limpo para seus emails. Personalize o conteúdo conforme necessário.</p>
            <p>Você pode adicionar:</p>
            <ul>
                <li>Listas de itens</li>
                <li>Links importantes</li>
                <li>Informações de contato</li>
            </ul>
            <a href="#" class="btn">Botão de Ação</a>
            <p>Atenciosamente,<br><strong>Sua Equipe</strong></p>
        </div>
        <div class="footer">
            <p>Este é um email automático. Para mais informações, visite nosso site.</p>
        </div>
    </div>
</body>
</html>`,
    corporate: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: #f8f9fa;
        }
        .container {
            max-width: 650px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.2em;
            font-weight: bold;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 1.1em;
        }
        .content {
            padding: 40px;
        }
        .content h2 {
            color: #333;
            border-bottom: 3px solid #007bff;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .cta {
            background: #007bff;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin: 20px 0;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .cta:hover {
            background: #0056b3;
        }
        .stats {
            display: flex;
            justify-content: space-around;
            margin: 30px 0;
            text-align: center;
        }
        .stat-item {
            flex: 1;
            padding: 20px;
        }
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #007bff;
        }
        .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #6c757d;
            border-top: 1px solid #dee2e6;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            color: #007bff;
            text-decoration: none;
            margin: 0 10px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Sua Empresa</h1>
            <p>Comunicado Corporativo Importante</p>
        </div>
        <div class="content">
            <h2>Resultados do Trimestre</h2>
            <p>Prezados(as) Stakeholders,</p>
            <p>Temos o prazer de compartilhar os excelentes resultados do último trimestre. Nossa empresa continua crescendo e inovando.</p>

            <div class="stats">
                <div class="stat-item">
                    <div class="stat-number">+25%</div>
                    <div>Crescimento</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">1.2M</div>
                    <div>Clientes</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">99.9%</div>
                    <div>Uptime</div>
                </div>
            </div>

            <p>Estamos comprometidos em continuar oferecendo o melhor serviço e produtos para nossos clientes.</p>

            <a href="#" class="cta">Ver Relatório Completo</a>

            <p>Obrigado pela confiança em nossa empresa.</p>
            <p><strong>Equipe Executiva</strong></p>
        </div>
        <div class="footer">
            <div class="social-links">
                <a href="#">LinkedIn</a>
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
                <a href="#">Website</a>
            </div>
            <p>© 2025 Sua Empresa. Todos os direitos reservados.</p>
            <p>Este email foi enviado para você como parte de nossa comunicação corporativa.</p>
        </div>
    </div>
</body>
</html>`
};

/**
 * @global
 * @type {string}
 * @description Stores the name of the currently active template.
 */
let currentTemplate = 'blank';

// DOM Elements Cache
/** @type {HTMLTextAreaElement|null} */
const codeEditorEl = document.getElementById('codeEditor');
/** @type {HTMLIFrameElement|null} */
const previewFrameEl = document.getElementById('previewFrame');
/** @type {NodeListOf<HTMLDivElement>} */
const templateItems = document.querySelectorAll('.template-item');
/** @type {HTMLInputElement|null} */
const emailTitleEl = document.getElementById('emailTitle');
/** @type {HTMLInputElement|null} */
const primaryColorEl = document.getElementById('primaryColor');
/** @type {HTMLSelectElement|null} */
const maxWidthEl = document.getElementById('maxWidth');
/** @type {HTMLButtonElement|null} */
const copyToClipboardBtn = document.querySelector('.sidebar-content .btn-success.btn-full');
/** @type {HTMLButtonElement|null} */
const downloadHtmlBtn = document.querySelectorAll('.sidebar-content .btn-primary.btn-full')[0]; // First primary button in sidebar
/** @type {HTMLButtonElement|null} */
const downloadPdfBtn = document.querySelectorAll('.sidebar-content .btn-primary.btn-full')[1]; // Second primary button in sidebar
/** @type {HTMLButtonElement|null} */
const toggleSidebarBtn = document.querySelector('.toolbar .btn-primary');
/** @type {HTMLButtonElement|null} */
const updatePreviewBtn = document.querySelector('.toolbar .btn-primary[onclick="updatePreview()"]')
    || document.querySelector('.toolbar .btn-primary:not([onclick="toggleSidebar()"])'); // More robust selector for update preview

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initializes the application:
 * - Loads the default template.
 * - Sets up event listeners for UI elements.
 * - Attaches quick settings handlers.
 * @returns {void}
 */
function initializeApp() {
    if (!codeEditorEl || !previewFrameEl || !emailTitleEl || !primaryColorEl || !maxWidthEl || !copyToClipboardBtn || !downloadHtmlBtn || !downloadPdfBtn || !toggleSidebarBtn || !updatePreviewBtn) {
        console.error("Um ou mais elementos essenciais do DOM não foram encontrados. A aplicação pode não funcionar corretamente.");
        showStatus("Erro crítico: Falha ao carregar a interface. Tente atualizar a página.", "error");
        return;
    }

    loadTemplate('blank'); // Load initial template
    updatePreview();       // Initial preview update

    // Event Listeners
    codeEditorEl.addEventListener('input', debounce(updatePreview, 500));

    templateItems.forEach(item => {
        item.addEventListener('click', () => {
            const templateName = item.getAttribute('data-template');
            if (templateName) {
                loadTemplate(templateName);
            }
        });
    });

    // Attach event listeners to buttons
    copyToClipboardBtn.addEventListener('click', copyToClipboard);
    downloadHtmlBtn.addEventListener('click', downloadHTML);
    downloadPdfBtn.addEventListener('click', downloadPDF);
    toggleSidebarBtn.addEventListener('click', toggleSidebar);
    updatePreviewBtn.addEventListener('click', updatePreview);

    // Quick settings handlers
    emailTitleEl.addEventListener('input', function() {
        // This value is used when downloading HTML/PDF.
        // No direct template update needed here unless specified by future requirements.
        console.log('Título do email alterado para:', this.value);
    });

    primaryColorEl.addEventListener('input', function() {
        // Placeholder: Implement logic to update primary color in the email template's CSS dynamically.
        // This would require parsing the HTML/CSS in the editor, which can be complex.
        // For now, this setting is cosmetic or for future use.
        console.log('Cor principal alterada para:', this.value);
        showStatus('A alteração de cor principal é um recurso visual e não afeta o template diretamente (ainda).', 'warning');
    });

    maxWidthEl.addEventListener('change', function() {
        // Placeholder: Implement logic to update the max-width of the email's main container.
        // Similar to primaryColor, this would require dynamic CSS manipulation in the editor.
        console.log('Largura máxima alterada para:', this.value);
        showStatus('A alteração de largura máxima é um recurso visual e não afeta o template diretamente (ainda).', 'warning');
    });
    console.log("Email Builder inicializado e event listeners configurados.");
}

/**
 * Loads a specified template into the code editor and updates the preview.
 * @param {string} templateName - The name of the template to load (must be a key in `templates` object).
 * @returns {void}
 */
function loadTemplate(templateName) {
    if (!codeEditorEl) {
        console.error("Editor de código não encontrado (loadTemplate).");
        showStatus("Erro: Editor não encontrado.", "error");
        return;
    }
    if (templates.hasOwnProperty(templateName)) {
        currentTemplate = templateName;
        codeEditorEl.value = templates[templateName];

        // Update active template visual state
        templateItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-template') === templateName) {
                item.classList.add('active');
            }
        });

        updatePreview();
        showStatus(`Template "${templateName}" carregado com sucesso.`, 'success');
    } else {
        showStatus(`Erro: Template "${templateName}" não encontrado.`, 'error');
        console.error(`Template "${templateName}" not found.`);
    }
}

/**
 * Updates the content of the preview iframe with the current HTML/CSS from the code editor.
 * @returns {void}
 */
function updatePreview() {
    if (!codeEditorEl || !previewFrameEl) {
        console.error("Editor de código ou frame de preview não encontrado (updatePreview).");
        // Optionally show a non-intrusive error to the user if this is critical
        return;
    }
    const code = codeEditorEl.value;
    previewFrameEl.srcdoc = code; // Using srcdoc is generally safe and effective for self-contained HTML
}

/**
 * Copies the HTML content from the code editor to the clipboard.
 * Uses a temporary window to help preserve HTML formatting for pasting into rich text editors like Gmail.
 * @async
 * @returns {Promise<void>}
 */
async function copyToClipboard() {
    if (!codeEditorEl) {
        showStatus('Erro: Editor de código não encontrado.', 'error');
        console.error("Editor de código não encontrado (copyToClipboard).");
        return;
    }
    try {
        const htmlContent = codeEditorEl.value;

        const tempWindow = window.open('', '_blank', 'width=1,height=1,left=-1000,top=-1000'); // Hidden window
        if (!tempWindow) {
            showStatus('Erro ao abrir janela auxiliar para cópia. Verifique bloqueadores de pop-up.', 'error');
            return;
        }

        tempWindow.document.write(htmlContent);
        tempWindow.document.close(); // Important to finalize document writing

        // Delay slightly to ensure content is rendered in the temp window
        await new Promise(resolve => setTimeout(resolve, 200));

        tempWindow.focus();
        const selection = tempWindow.document.getSelection();
        const range = tempWindow.document.createRange();
        // Select the body content, or the documentElement if body is not what's desired (e.g. full HTML doc)
        range.selectNodeContents(tempWindow.document.body);
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }

        let success = false;
        try {
            success = tempWindow.document.execCommand('copy');
        } catch (err) {
            console.error('Falha ao executar comando de cópia:', err);
        }

        tempWindow.close(); // Close the temporary window

        if (success) {
            showStatus('Conteúdo copiado! Cole no Gmail (Ctrl+V ou Cmd+V).', 'success');
        } else {
            // Fallback for browsers or situations where execCommand fails (e.g. some security contexts)
            // Attempt to use navigator.clipboard.writeText for plain text as a last resort, or inform user.
            try {
                await navigator.clipboard.writeText(htmlContent); // This will be plain text
                showStatus('Copiado como texto plano. Para formatação completa, tente selecionar e copiar manualmente do preview.', 'warning');
            } catch (clipError) {
                showStatus('Falha ao copiar. Tente selecionar o conteúdo no editor e copiar manualmente (Ctrl+C).', 'error');
                console.error('Erro no fallback de cópia para área de transferência:', clipError);
            }
        }

    } catch (error) {
        console.error('Erro inesperado ao copiar para a área de transferência:', error);
        showStatus('Erro inesperado ao copiar. Tente novamente.', 'error');
    }
}

/**
 * Initiates a PDF download of the current email content by opening a print dialog.
 * The user can then choose "Save as PDF" from the print options.
 * @returns {void}
 */
function downloadPDF() {
    if (!codeEditorEl) {
        showStatus('Erro: Editor de código não encontrado.', 'error');
        console.error("Editor de código não encontrado (downloadPDF).");
        return;
    }
    try {
        const htmlContent = codeEditorEl.value;

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            showStatus('Erro ao abrir janela para PDF. Verifique bloqueadores de pop-up.', 'error');
            return;
        }

        // Inject HTML content and print-specific styles
        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Imprimir Email como PDF</title>
                <style>
                    @media print {
                        body {
                            margin: 0 !important;
                            padding: 10mm !important; /* Standard margin for printing */
                            -webkit-print-color-adjust: exact !important; /* Chrome, Safari, Edge */
                            color-adjust: exact !important; /* Firefox */
                        }
                        /* Add any other print-specific overrides here */
                    }
                    @media screen { /* Styles for the preview window before printing */
                        body {
                            font-family: Arial, sans-serif;
                            margin: 20px;
                            background: #eee; /* Light background for the preview window */
                        }
                    }
                </style>
            </head>
            <body>
                ${htmlContent}
            </body>
            </html>
        `);
        // Removed replacements of html/head/body tags to preserve full document structure if present

        printWindow.document.close();

        // Wait for content to fully render in the new window before triggering print
        setTimeout(() => {
            printWindow.focus(); // Ensure the window is focused
            printWindow.print(); // Trigger the browser's print dialog

            // Do not close the window immediately; user might need it or cancel printing.
            // Some browsers also close the window automatically after print job is sent.
        }, 750); // Increased timeout for robust rendering

        showStatus('Janela de impressão aberta. Escolha "Salvar como PDF".', 'success');

    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showStatus('Erro ao gerar PDF. Tente novamente.', 'error');
    }
}

/**
 * Initiates an HTML file download of the current email content from the code editor.
 * @returns {void}
 */
function downloadHTML() {
    if (!codeEditorEl || !emailTitleEl) {
        showStatus('Erro: Elementos essenciais não encontrados para download.', 'error');
        console.error("Editor de código ou campo de título não encontrado (downloadHTML).");
        return;
    }
    const code = codeEditorEl.value;
    const rawTitle = emailTitleEl.value || 'email_template';
    // Sanitize filename: replace spaces and special characters (allow letters, numbers, underscore, hyphen, dot)
    const sanitizedTitle = rawTitle.replace(/[^a-zA-Z0-9_.-]/g, '_').replace(/__+/g, '_');

    const blob = new Blob([code], { type: 'text/html;charset=utf-8' }); // Specify charset
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${sanitizedTitle}.html`;
    document.body.appendChild(a); // Append to body to ensure click works in all browsers (esp. Firefox)
    a.click();

    document.body.removeChild(a); // Clean up the temporary anchor element
    URL.revokeObjectURL(url); // Release the object URL
    showStatus(`HTML "${sanitizedTitle}.html" baixado com sucesso!`, 'success');
}

/**
 * Toggles the visibility of the sidebar (e.g., for mobile or compact views).
 * Assumes the sidebar has a class 'open' to control visibility.
 * @returns {void}
 */
function toggleSidebar() {
    const sidebarEl = document.querySelector('.sidebar');
    if (sidebarEl) {
        sidebarEl.classList.toggle('open');
    } else {
        console.warn("Elemento sidebar não encontrado (toggleSidebar).");
    }
}

/**
 * Displays a temporary status message to the user at the top-right of the screen.
 * @param {string} message - The message to display.
 * @param {('success'|'error'|'warning')} [type='success'] - The type of message, controlling its appearance.
 * @returns {void}
 */
function showStatus(message, type = 'success') {
    const statusEl = document.getElementById('statusMessage');
    if (statusEl) {
        statusEl.textContent = message;
        // Ensure base class is always present, then add type and 'show'
        statusEl.className = 'status-message';
        statusEl.classList.add(type, 'show');

        // Automatically hide the message after a delay
        setTimeout(() => {
            statusEl.classList.remove('show');
        }, 3500); // Slightly longer display time
    } else {
        // Fallback if status element is missing (e.g., during development or if HTML is broken)
        console.warn(`Status message element not found. Attempted to show: [${type}] ${message}`);
        // alert(`[${type}] ${message}`); // Use alert as a last resort for critical messages if UI element is missing
    }
}

/**
 * Debounce function: delays the execution of a function until after a certain period of inactivity.
 * Useful for events that fire rapidly, like 'input' or 'resize'.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The debounce delay in milliseconds.
 * @returns {Function} A new function that will be debounced.
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const context = this; // Preserve context
        const later = () => {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// --- "API" de Email Builder ---
/**
 * @namespace EmailBuilderAPI
 * @description Provides a programmatic interface to control the Email Builder functionalities.
 */
const EmailBuilderAPI = {
    /**
     * Loads a specific template into the editor.
     * @memberof EmailBuilderAPI
     * @param {string} templateName - The key name of the template (e.g., 'blank', 'asof', 'simple', 'corporate').
     * @example EmailBuilderAPI.loadTemplate('simple');
     */
    loadTemplate: function(templateName) {
        loadTemplate(templateName); // Calls the internal loadTemplate function
    },

    /**
     * Retrieves the current HTML content from the code editor.
     * @memberof EmailBuilderAPI
     * @returns {string} The HTML content as a string. Returns empty string if editor not found.
     * @example const currentHtml = EmailBuilderAPI.getCurrentHtml();
     */
    getCurrentHtml: function() {
        return codeEditorEl ? codeEditorEl.value : '';
    },

    /**
     * Sets the HTML content of the code editor and updates the preview.
     * @memberof EmailBuilderAPI
     * @param {string} htmlContent - The HTML string to set as the editor's content.
     * @example EmailBuilderAPI.setHtml('<h1>Hello World!</h1><p>This is a test.</p>');
     */
    setHtml: function(htmlContent) {
        if (codeEditorEl) {
            codeEditorEl.value = htmlContent;
            updatePreview(); // Ensure preview reflects the change
        } else {
            console.error("Editor de código não encontrado (EmailBuilderAPI.setHtml).");
        }
    },

    /**
     * Returns a list of available template names.
     * @memberof EmailBuilderAPI
     * @returns {string[]} An array of strings, where each string is a key for an available template.
     * @example const available = EmailBuilderAPI.getAvailableTemplates(); // ['blank', 'asof', ...]
     */
    getAvailableTemplates: function() {
        return Object.keys(templates);
    },

    /**
     * Manually triggers an update of the preview panel based on the current editor content.
     * @memberof EmailBuilderAPI
     * @example EmailBuilderAPI.refreshPreview();
     */
    refreshPreview: updatePreview,

    /**
     * Programmatically triggers the "Copy to Clipboard" functionality.
     * @memberof EmailBuilderAPI
     * @async
     * @returns {Promise<void>}
     * @example await EmailBuilderAPI.triggerCopyToClipboard();
     */
    triggerCopyToClipboard: async function() {
        await copyToClipboard();
    },

    /**
     * Programmatically triggers the "Download HTML" functionality.
     * @memberof EmailBuilderAPI
     * @example EmailBuilderAPI.triggerDownloadHTML();
     */
    triggerDownloadHTML: downloadHTML,

    /**
     * Programmatically triggers the "Download PDF" functionality.
     * @memberof EmailBuilderAPI
     * @example EmailBuilderAPI.triggerDownloadPDF();
     */
    triggerDownloadPDF: downloadPDF,

    /**
     * Displays a status message to the user.
     * @memberof EmailBuilderAPI
     * @param {string} message - The text of the message.
     * @param {('success'|'error'|'warning')} [type='success'] - The type of message (controls styling).
     * @example EmailBuilderAPI.displayStatus('Operation completed!', 'success');
     */
    displayStatus: showStatus,

    /**
     * Toggles the sidebar visibility.
     * @memberof EmailBuilderAPI
     * @example EmailBuilderAPI.toggleSidebar();
     */
    toggleSidebarState: toggleSidebar // Renamed for clarity if used as API
};

// Expose the API to the global window object for external access or debugging.
// This can be useful for integration with other scripts or browser developer tools.
window.EmailBuilderAPI = EmailBuilderAPI;

// Example of using the API after initialization (optional, for testing or demonstration)
// document.addEventListener('DOMContentLoaded', () => {
//     setTimeout(() => {
//         if (window.EmailBuilderAPI) {
//             console.log("API de Email Builder está pronta.");
//             console.log("Templates disponíveis:", EmailBuilderAPI.getAvailableTemplates());
//             // Exemplo de uso:
//             // EmailBuilderAPI.loadTemplate('simple');
//             // EmailBuilderAPI.setHtml('<h1>API Test</h1><p>Conteúdo definido via API.</p>');
//             // EmailBuilderAPI.displayStatus('API carregada e testada!', 'success');
//         }
//     }, 2000); // Delay to ensure everything is loaded
// });
