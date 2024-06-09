# Leerroutes

![GitHub Licentie](https://img.shields.io/github/license/Windesheim-HBO-ICT/Leerroutes)
![Project Status Badge](https://img.shields.io/badge/status-in%20progress-brightgreen)
![Versie Status Badge](https://img.shields.io/badge/versie-beta-orange)

NPM-packages voor het visueel weergeven van leerroutes binnen HBO-ICT.

## Inhoudsopgave
- [Algemene informatie](#algemene-informatie)
- [Installatie](#installatie)
- [Deployen](#deployen)
- [Ontwikkelen](#ontwikkelen)
- [Bijdragen](#bijdragen)
- [Licentie](#licentie)

## Algemene informatie
Deze package wordt gebruikt binnen het curriculumproject om alle leerroutes van de opleiding HBO-ICT van Windesheim visueel weer te geven op een gemakkelijke manier voor studenten. Hierdoor zullen studenten weten hoe de HBO-ICT opleiding in elkaar zit en direct kunnen informatie vinden over elk semester.

Om Leerroutes op zo veel mogelijke plaatsen beschikbaar te maken zal het ontwikkeld worden met Javascript webcomponent en dus geen framework bevatten. 

### Functies
Het concept van deze project is deze afbeelding:
![Leerroutes concept](https://github.com/Labhatorian/Leerroutes/assets/16213031/3e5c08df-3096-4783-ab67-3a85d372f25f)

Er is vervolgens met [d3-force](https://d3js.org/d3-force#d3-force) van [d3](https://d3js.org/) gebruikt om dit te realiseren.

In het huidige versie is het volgende mogelijk:
- Responsive weergave van Leerroutes op basis van een LeerrouteItem
- Metrolijnen tussen de leerroutes om alle paden van HBO-ICT te laten zien
- Klikken op een item linkt naar de module
- Customability van de items

### Gebruiken
Om de Leerroutes package te gebruiken moet u bewust zijn van twee dingen:
- [**Gebruiken:** hoe u de Leerroutes package en de Leerroutesworkspace component moet gebruiken.](./docs/usage.md)
- [**Leerrouteitem:** waaruit de Leerrouteworkspace uit bestaat.](./docs/leerrouteitem.md)

## Installatie
Deze npm-package kan worden geïnstalleerd via:

```bash
npm install leerroutes
```
of
```bash
yarn add leerroutes
```

## Deployen
Na het pushen naar main wordt er een [workflow](https://github.com/Windesheim-HBO-ICT/Leerroutes/blob/main/.github/workflows/publish.yml) uitgevoerd. Deze workflow build de Leerroutes package met webpack om het vervolgens met een `NPM_TOKEN` het te publishen naar npm.

## Ontwikkelen
Als je wilt bijdragen aan de Leerroutes-package, zijn er een paar belangrijke dingen om te weten. \
Allereerst wordt er gebruik gemaakt van [Yarn](https://yarnpkg.com/) en Yarn  Workspaces om de package in `./src/leerroutes` af te scheiden van de testsite in `./src/test-site`.

Ook wordt er gebruik gemaakt van [Eslint](https://eslint.org/) om kwaliteit af te dwingen. Wij raden een extensie in je IDE te installeren zoals [Eslint van Microsoft](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Om te gaan ontwikkelen voor Leerroutes zijn zal je deze commando's moeten uitvoeren:

Ten eerste moet leerroutes gebuild worden door middel van [Webpack](https://webpack.js.org/):
```bash
yarn workspace leerroutes dev:build
```
en dan kan je het direct gebruiken met `test-site` via:
```bash
yarn workspace test-site start
``` 

>Merk op dat de leerroutes-npm-package niet direct beschikbaar is in de testsite, je kunt deze toevoegen door het volgende uit te voeren:

```bash
yarn workspace leerroutes link
```

```bash
yarn workspace test-site link `leerroutes`
```

--- 


### Bijdragen
Om bij te dragen aan dit project kun je een fork maken en vervolgens pull-requests maken naar deze repository.

Voor informatie, problemen en ideeën wordt verwezen naar het volgende:
- [Project](https://github.com/orgs/Windesheim-HBO-ICT/projects/4)
- [Issues](https://github.com/Windesheim-HBO-ICT/Leerroutes/issues)
- [Discussions](https://github.com/Windesheim-HBO-ICT/Leerroutes/discussions)

Zorg er ook voor dat je comments achterlaat in je code als documentatie voor toekomstige studenten en ontwikkelaars die bijdragen aan het project.

## Licentie
Dit project heeft momenteel nog geen licentie.
