DELETE from user WHERE 1=1;

UPDATE SQLITE_SEQUENCE SET seq=0 WHERE name='user';

INSERT into user (userID, logintype, accountID, profilePicture, email, activeFlag) VALUES ('schultzder','facebook', 'text', 'text', 'sample.derek@email.com', 'Y');
INSERT into user (userID, logintype, accountID, profilePicture, email, activeFlag) VALUES ('kkwasniewski','facebook', 'text', 'text', 'sample.kyle@email.com', 'Y');


select
    count(`u`.`user_id`) AS `Crowns`,
    `u`.`user_id` AS `user_id`,
    `u`.`username` AS `username`
from
    (`Robots`.`daily_challenge_submit` `dcs`
join `Robots`.`user` `u` on
    ((`dcs`.`user_id` = `u`.`user_id`)))
where
    ((`dcs`.`user_id` = (
    select
        `Robots`.`daily_challenge_submit`.`user_id`
    from
        `Robots`.`daily_challenge_submit`
    where
        ((`Robots`.`daily_challenge_submit`.`dc_id` = `dcs`.`dc_id`)
            and (`Robots`.`daily_challenge_submit`.`completed` = 1))
    order by
        `Robots`.`daily_challenge_submit`.`score`,
        timediff(`Robots`.`daily_challenge_submit`.`submitted`, `Robots`.`daily_challenge_submit`.`startTime`)
    limit 1))
        and (`u`.`user_id` <> 1)
            and (`dcs`.`dc_id` <> (
            select
                max(`Robots`.`daily_challenge`.`dc_id`)
            from
                `Robots`.`daily_challenge`
            where
                (now() >= `Robots`.`daily_challenge`.`created`))))
group by
    `u`.`user_id`
order by
    `Crowns` desc