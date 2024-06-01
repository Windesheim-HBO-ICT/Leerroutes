# Gebruiken
Om de Leerroutes package te gebruiken in uw project, raden wij aan om de voorbeeld te bekijken van [test-site](../src/test-site/public/index.html). \
Hieronder een uitleg over wat er in `test-site` te zien is.

## 1. Gebruiknemen van Leerroutes - LeerrouteWorkspace
### 2.1. Component toevoegen aan de pagina
Importeer de Leerroutes package. In de `test-site` linken we er direct naartoe met:
```html
<script src="vendor/Leerroutes/dist/bundle.js"></script>
```
>**Let op** \
> `vendor` is van `test-site`. Dit is ingesteld i.v.m. CORS. U zal hoogstwaarschijnlijk een ander manier gebruiken dan `test-site` om het te importeren. \
> Het ingangspunt voor de package is daarnaast altijd `Leerroutes/dist/bundle.js` omdat er Webpack is gebruikt.

Vervolgens voeg de Leerroutes workspace component toe aan uw HTML-pagina.

```html
<leerroute-workspace id="leerrouteWorkspace"></leerroute-workspace>
```

### 2.2. Leerroute items toevoegen
Voeg [leerroute items](./leerrouteitem.md) toe aan de workspace door JavaScript te gebruiken. Hier is een voorbeeld op basis van `test-site` van hoe u dit kunt doen:
```html
<script>
    const leerrouteWorkspace = document.getElementById('leerrouteWorkspace');

    const leerrouteItems = [
        // Uw leerroute items hier
    ];

    leerrouteWorkspace.setLeerrouteItems(leerrouteItems);
</script>
```

## 2. LeerrouteWorkspace aanpassen
U kunt verschillende attributen aanpassen om de visuele weergave van de leerroute items te wijzigen. Hier zijn de beschikbare attributen:
| Attribuut    | Beschrijving                                           | Standaard |
|--------------|--------------------------------------------------------|-----------|
| node-radius  | De straal van de cirkel die elk item vertegenwoordigt. | 20        |
| link-width   | De breedte van de metrolijnen tussen items.            | 3         |
| link-opacity | De opaciteit van de metrolijnen.                       | 0.6       |
| link-spacing | De afstand tussen de metrolijnen.                      | 2         |

