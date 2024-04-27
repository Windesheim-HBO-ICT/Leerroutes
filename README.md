# Leerroutes

![GitHub Licentie](https://img.shields.io/github/license/Windesheim-HBO-ICT/Leerroutes)
![Project Status Badge](https://img.shields.io/badge/status-in%20progress-brightgreen)
![Versie Status Badge](https://img.shields.io/badge/versie-alpha-blue)

NPM-packages voor het visueel weergeven van leerroutes binnen HBO-ICT.

## Inhoudsopgave
- [Algemene informatie](#algemene-informatie)
- [Installatie](#installatie)
- [Deployen](#deployen)
- [Ontwikkelen](#ontwikkelen)
- [Bijdragen](#bijdragen)
- [Licentie](#licentie)

## Algemene informatie
Deze package wordt gebruikt binnen het curriculumproject om alle leerroutes van de opleiding HBO-ICT van Windesheim visueel weer te geven op een gemakkelijke manier voor studenten.

Om Leerroutes op zo veel mogelijke plaatsen beschikbaar te maken zal het ontwikkeld worden met Javascript webcomponent en dus geen framework bevatten. 

### Functies
Het zal op termijn mogelijk zijn om de leerroutes te bekijken met behulp van metrolijnen zoals in deze afbeelding met:

(afbeelding hier)

Hiervoor zal [d3-force](https://d3js.org/d3-force#d3-force) gebruikt worden van [d3](https://d3js.org/) om dit te realiseren.

## Installatie
Deze npm-package kan worden geïnstalleerd via (zodra mogelijk):

```bash
npm install leerroutes
```
of
```bash
yarn add leerroutes
```

## Deployen
Zodra de package gereed is om te deployen, zal er een workflow worden uitgevoerd wanneer er iets wordt gepusht naar main. Deze workflow zal de code builden en dan pushen naar npm

## Ontwikkelen
Als je wilt bijdragen aan de Leerroutes-package, zijn er een paar belangrijke dingen om te weten. \
Allereerst wordt er gebruik gemaakt van [Yarn](https://yarnpkg.com/) en Yarn  Workspaces om de package in `./src/leerroutes` af te scheiden van de testsite in `./src/test-site`.

Om te gaan ontwikkelen voor Leerroutes zijn zal je deze commando's moeten uitvoeren:

Ten eerste moet leerroutes gebuild worden door middel van [Webpack](https://webpack.js.org/):
```bash
yarn workspace leerroutes build
```
en dan kan je het direct gebruiken met `test-site` via:
```bash
yarn workspace test-site start
``` 

>Merk op dat de leerroutes-npm-package niet direct beschikbaar is in de testsite, je kunt deze toevoegen door het volgende uit te voeren:
```bash
yarn workspace test-site link `leerroutes`
```

### Bijdragen
Om bij te dragen aan dit project kun je een fork maken en vervolgens pull-requests maken naar deze repository.

Voor informatie, problemen en ideeën wordt verwezen naar het volgende:
- [Project](https://github.com/orgs/Windesheim-HBO-ICT/projects/4)
- [Issues](https://github.com/Windesheim-HBO-ICT/Leerroutes/issues)
- [Discussions](https://github.com/Windesheim-HBO-ICT/Leerroutes/discussions)

Zorg er ook voor dat je comments achterlaat in je code als documentatie voor toekomstige studenten en ontwikkelaars die bijdragen aan het project.

## Licentie
Dit project heeft momenteel nog geen licentie.
