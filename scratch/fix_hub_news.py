import sys

target_file = 'src/pages/HubDashboard.jsx'

new_flashes = """    const newsFlashes = [
        {
            es: "Bienvenido al Portal Institucional Vecinos La Serena: Su conexión directa con los servicios municipales y la innovación ciudadana.",
            en: "Welcome to the Vecinos La Serena Institutional Portal: Your direct connection with municipal services and citizen innovation.",
            it: "Benvenuti nel Portale Istituzionale Vecinos La Serena: La vostra connessione diretta con i servicios municipali e l'innovazione cittadina.",
            fr: "Bienvenue sur le Portail Institutionnel Vecinos La Serena : Votre connexion directe avec les services municipaux et l'innovation citoyenne.",
            zh: "欢迎来到拉塞雷纳机构门户网站：您与市政服务和公民创新的直接联系。",
            pt: "Bem-vindo ao Portal Institucional Vecinos La Serena: Sua conexão direta com os serviços municipais e a inovación cidadã."
        },
        {
            es: "SMART CITIZENS: Acceda al reporte urbano georreferenciado para informar baches, luminarias y otras incidencias en tiempo real.",
            en: "SMART CITIZENS: Access the georeferenced urban report to report potholes, streetlights, and other incidents in real time.",
        },
        {
            es: "SMART ADMINISTRATION: Portal E-Learning operativo para la capacitación continua y digitalización de informes de gestión interna.",
            en: "SMART ADMINISTRATION: E-Learning Portal operational for continuous training and digitalization of internal management reports.",
            it: "SMART ADMINISTRATION: Portale E-Learning operativo per la formazione continua e la digitalizzazione dei rapporti di gestione interna.",
            fr: "SMART ADMINISTRATION : Portail E-Learning opérationnel pour la formation continue et la numérisation des rapports de gestión interne.",
            zh: "智慧管理：电子学习门户网站运行，用于持续培训和内部管理报告的数字化。",
            pt: "SMART ADMINISTRATION: Portal de E-Learning operacional para treinamento contínuo e digitalização de relatórios de gestão interna."
        }
    ];"""

with open(target_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# find start and end of newsFlashes
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if 'const newsFlashes = [' in line:
        start_idx = i
    if start_idx != -1 and '    ];' in line and i > start_idx:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    new_lines = lines[:start_idx] + [new_flashes + '\\n'] + lines[end_idx+1:]
    with open(target_file, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully updated HubDashboard.jsx")
else:
    print("Could not find newsFlashes array")
