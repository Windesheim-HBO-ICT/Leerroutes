# LeerrouteItem

Deze documentatie heeft tot doel u, de lezer, uit te leggen wat de structuur van een leerrouteitem is.

### Voorbeeld

Hier is een voorbeeld van een leerrouteitem:

```javascript
{
    id: 'AIS',
    group: 'ais',
    groupPosition: 'fourthRang',
    children: [
        "Harris"
    ],
    constraints: [
        "OOSDD",
        {
            from: "CAA",
            to: "BPM"
        }
    ],
    data: {
        link: "https://keuzewijzerhboict.nl",
    }
}
```

### Uitleg
| Veld          | Beschrijving                                                                                                 |
|---------------|--------------------------------------------------------------------------------------------------------------|
| id            | Een unieke identificatie en naam voor het leerrouteitem.                                                     |
| group         | De groep bepaalt de kleur van het leerrouteitem.                                                             |
| groupPosition | De positie van het leerrouteitem binnen zijn groep voor een samenhangende weergave.                          |
| children      | Andere items waar je vanuit het huidige item naartoe kunt navigeren.                                         |
| constraints   | Beperkingen voor de 'metrolijnen' die worden gebouwd vanuit de children. Extra uitleg hieronder.             |
| data          | Bevat extra gegevens die belangrijk kunnen zijn voor de node. Bijvoorbeeld een link. Extra uitleg hieronder. |

#### Constraints
Binnen de constraints kunnen zowel strings als constraint-objecten voorkomen.

- **Strings**: Dit zijn vereisten die moeten worden voldaan voordat dit leerrouteitem kan worden voltooid.
- **Constraint-objecten**: Specifieke voorwaarden tussen twee leerrouteitems. \
Het `from`-veld geeft aan waar de beperking begint, en het `to`-veld geeft aan waar de beperking eindigt. Bijvoorbeeld, in dit voorbeeld kan de metrolijn niet van 'CAA' naar 'BPM' gaan, maar kan wel elders.

#### Data
Het data-veld bevat extra informatie zoals een link naar een webpagina die geopend kan worden wanneer op het item wordt geklikt.

---

Dit is een vereenvoudigde uitleg om de structuur van een leerrouteitem te begrijpen. Elk veld en de constraints kunnen worden aangepast aan de specifieke behoeften van een leersysteem.
