import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const secretKey = process.env.SECRET_KEY;
const databaseId = process.env.DATABASE_ID;

fetch('https://api.notion.com/v1/pages', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${secretKey}`,
    'Notion-Version': '2021-05-11',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    parent: {database_id: `${databaseId}`},
    properties: {
      name: {
        rich_text: [{
          text: {
            content: 'test_name3'
          }
        }]
      },
      detail: {
        rich_text: [{
          text: {
            content: 'test_detail3'
          }
        }]
      },
      title: {
        title: [{
          text: {
            content: 'test_id3'
          }
        }]
      },
    }
  })
})
  .then(response => {
    return response.json()
  })
  .then((response: any) => {
    console.log(response)
  })
  .catch(error => {
    console.error(error)
  })

fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${secretKey}`,
    'Notion-Version': '2022-02-22'
  }
})
  .then(response => {
    return response.json()
  })
  .then((response: any) => {
    for (const res of response.results) {
      for (const [key, value] of Object.entries(res.properties)) {
        console.log(key)
        console.log(value)
        console.log('==================')
      }
    }
  })
  .catch(error => {
    console.error(error)
  })


