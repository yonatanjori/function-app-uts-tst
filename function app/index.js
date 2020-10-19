const CosmosClient = require('@azure/cosmos').CosmosClient
const client = new CosmosClient(process.env.COSMOS_API)
const database = client.database('db-database-tst')
const container = database.container('db-container-tst')

module.exports = async function (context, req) {
  try {
    const first = req.body.first
    const middle = req.body.middle
    const last = req.body.last

    if (first && middle && last) {
      const payload = {
        name: `${first} ${middle} ${last}`
      }

      await container.items.create(payload)
      context.res = {
        status: 200,
        body: {
            name: payload.name
        }
      }
    } else {
      context.res = {
        status: 400,
        body: {
            message: "Required body not found."
        }
      }
    }
  } catch (err) {
    context.res = {
      status: 500,
      body: err.message
    }
  }
}