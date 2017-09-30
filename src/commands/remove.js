const User = require('../models/user');
const { getOrCreateUser, userHasImage } = require('./middleware');

const middleware = [getOrCreateUser(), userHasImage('ref')];
const parameters = [
  {
    name: 'ref',
    description: 'reference name',
  },
];
const commandName = 'remove';

module.exports = () => ({
  parameters,
  middleware,
  handler: User.removeImageLink.bind(User),
  triggers: [commandName],
  description: 'Removes an image',
});
