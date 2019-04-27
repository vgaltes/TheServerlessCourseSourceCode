module.exports.handler = async event => {
    console.log(JSON.stringify(event));

    const { name } = JSON.parse(event.body);

    const res = {
        statusCode: 200,
        body: JSON.stringify(`Hello ${name}`)
    };

    return res;
};
