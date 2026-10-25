# Sistema RPA de Data Discovery Solutions S.A.C.

![Wallpaper](core/client/public/portada.png)

Sistema para implementar y gestionar soluciones de automatización RPA & IA para empresas y organizaciones públicas. El frontend (Next.js) se despliega en Vercel; la API (ASP.NET Core) y la base de datos (Azure SQL Database) en Azure, en el grupo de recursos `rg-data-discovery-solutions`.

----

#### Clona el proyecto en local:

```bash
curl -fsSL https://raw.githubusercontent.com/ArcGabito/sistema-rpa-dds/master/scripts/setup.sh | bash
```

----

#### Despliegue

| Parte | Dónde |
| --- | --- |
| Frontend (`core/client`) | Vercel, con `API_URL` apuntando a la API y el mismo `JWT_SECRET` que ella. |
| API (`core/server`) | Azure Container Apps: `ca-sistema-rpa-dds-api` en el entorno `cae-data-discovery-solutions`. Escala a cero sin tráfico y a una réplica como máximo. |
| Base de datos | Azure SQL Database: `db-rpa-dds` en `data-discovery-solutions-sql`, plan gratuito (se pausa si agota su cuota del mes). |

Con cada push a `master`, el CI publica la imagen de la API en GitHub Container Registry (`ghcr.io/arcgabito/sistema-rpa-dds-api`) y la despliega en la Container App. Para el despliegue, el repositorio necesita estos secretos o variables de Actions, de un registro de aplicación de Microsoft Entra con credencial federada para la rama `master` y permiso sobre la Container App:

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

Sin ellos, el CI publica la imagen pero no la despliega.

Los secretos de la API (cadena de conexión, `JWT_SECRET`, clave de la Bóveda y, si se configura, el SMTP) están en la Container App y no en el repositorio.

----

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE.md](LICENSE.md) para más detalles.
