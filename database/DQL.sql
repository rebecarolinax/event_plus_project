SELECT

	Usuario.Nome                                                                       AS [Nome do Usuario],
	TiposDeUsuario.TituloTipoUsuario                                                   AS [Tipo do Usuário],
	Evento.DataEvento                                                                  AS [Data do Evento],
	CONCAT(Instituicao.NomeFantasia,' ',Instituicao.Endereco)                          AS 'Local',
	TiposDeEvento.TituloTipoEvento                                                     AS [Tipo do Evento],
	Evento.Nome                                                                        AS [Nome do Evento],
	Evento.Descricao                                                                   AS [Descrição do Evento],
	CASE WHEN PresencasEvento.Situacao = 1 THEN 'Confirmada' ELSE 'Não Confirmada' END AS[Situação],
	ComentarioEvento.Descricao                                                         AS [Comentário]

FROM Evento
	INNER JOIN TiposDeEvento	ON Evento.IdTipoDeEvento = TiposDeEvento.IdTipoDeEvento
	INNER JOIN Instituicao		ON Evento.IdInstituicao = Instituicao.IdInstituicao
	INNER JOIN PresencasEvento	ON Evento.IdEvento = PresencasEvento.IdEvento
	INNER JOIN Usuario		ON PresencasEvento.IdUsuario = Usuario.IdUsuario
	INNER JOIN TiposDeUsuario	ON TiposDeUsuario.IdTipoDeUsuario = Usuario.IdTipoDeUsuario
	LEFT JOIN ComentarioEvento	ON ComentarioEvento.IdUsuario = Usuario.IdUsuario