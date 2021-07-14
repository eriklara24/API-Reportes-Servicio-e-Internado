export default function(req, res) {
  const { body } = req;
  const body = req.body;
  const usuario: any;

  res.status(201).send({ usuario });
}