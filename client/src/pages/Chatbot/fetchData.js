import axios from 'axios';

const fetchData = (input) => async(req, res) => {
    try{
        console.log("*********************************************************************************")
        console.log(req.body.input)
        const completion = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: req.body.input }],
        },
        {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${process.env.OPENAI_API_KEY}`
        }
        );
        console.log(completion.data.choices[0].message);
        res.status(200).send({ans : "jhjj"});
      }catch(err){
        console.log(err)
      }
}

export default fetchData;
