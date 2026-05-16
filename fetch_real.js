import fs from 'fs';

async function checkReal() {
    const ticket = '51A0ADFF-ACBB-40BB-ADFA-D8F22E75052E';
    const rut = '96.505.750-8';
    console.log("Fetching provider list...");
    const res = await fetch(`https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?rutproveedor=${rut}&ticket=${ticket}`);
    const data = await res.json();
    
    if (!data.Listado) {
        console.log("No listado found.", data);
        return;
    }
    
    const coquimboOcs = data.Listado.filter(oc => oc.Codigo && oc.Codigo.startsWith('71016-'));
    console.log(`Found ${coquimboOcs.length} OCs for Coquimbo (71016) in the recent supplier list.`);
    
    const detailedOcs = [];
    for (let i = 0; i < Math.min(coquimboOcs.length, 25); i++) {
        const ocId = coquimboOcs[i].Codigo;
        console.log(`Fetching details for ${ocId}...`);
        try {
            const detailRes = await fetch(`https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?codigo=${ocId}&ticket=${ticket}`);
            const detailData = await detailRes.json();
            if (detailData.Listado && detailData.Listado.length > 0) {
                const info = detailData.Listado[0];
                detailedOcs.push({
                    id: info.Codigo,
                    amount: info.TotalNeto || 0,
                    state: info.Estado || 'Aceptada',
                    date: new Date(info.Fechas.FechaCreacion).toLocaleDateString('es-CL'),
                    keyword: 'Publicidad', // default
                    hasPdf: true,
                    decretoLink: '#',
                    dept: info.Comprador ? info.Comprador.UnidadCompra : 'Municipalidad',
                    desc: info.Nombre + " - " + info.Descripcion
                });
            }
        } catch (e) {
            console.error(`Error fetching ${ocId}:`, e.message);
        }
        // sleep a bit to not overwhelm API
        await new Promise(r => setTimeout(r, 500));
    }
    
    fs.writeFileSync('real_coquimbo_ocs.json', JSON.stringify(detailedOcs, null, 2));
    console.log("Done. Saved to real_coquimbo_ocs.json");
}

checkReal();
