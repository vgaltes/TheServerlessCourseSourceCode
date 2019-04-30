module.exports.init = () => {
    process.env.AWS_REGION = "eu-west-1";
    process.env.getTogethersTableName = `${process.env.TEST_STAGE}-gettogethers`;
};