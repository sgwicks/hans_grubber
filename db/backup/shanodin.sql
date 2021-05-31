--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: commands; Type: TABLE; Schema: public; Owner: shanodin
--

CREATE TABLE public.commands (
    id integer NOT NULL,
    command_name character varying(255) NOT NULL,
    command_text text NOT NULL,
    command_uses integer DEFAULT 0
);


ALTER TABLE public.commands OWNER TO shanodin;

--
-- Name: commands_id_seq; Type: SEQUENCE; Schema: public; Owner: shanodin
--

CREATE SEQUENCE public.commands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.commands_id_seq OWNER TO shanodin;

--
-- Name: commands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shanodin
--

ALTER SEQUENCE public.commands_id_seq OWNED BY public.commands.id;


--
-- Name: errors; Type: TABLE; Schema: public; Owner: shanodin
--

CREATE TABLE public.errors (
    id integer NOT NULL,
    error_code character varying(255),
    error_details text,
    error_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.errors OWNER TO shanodin;

--
-- Name: errors_id_seq; Type: SEQUENCE; Schema: public; Owner: shanodin
--

CREATE SEQUENCE public.errors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.errors_id_seq OWNER TO shanodin;

--
-- Name: errors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shanodin
--

ALTER SEQUENCE public.errors_id_seq OWNED BY public.errors.id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: shanodin
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO shanodin;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: shanodin
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO shanodin;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shanodin
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: shanodin
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO shanodin;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: shanodin
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO shanodin;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shanodin
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: quotes; Type: TABLE; Schema: public; Owner: shanodin
--

CREATE TABLE public.quotes (
    id integer NOT NULL,
    quote_text text NOT NULL,
    quote_uses integer DEFAULT 0,
    quote_game character varying(255)
);


ALTER TABLE public.quotes OWNER TO shanodin;

--
-- Name: quotes_id_seq; Type: SEQUENCE; Schema: public; Owner: shanodin
--

CREATE SEQUENCE public.quotes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quotes_id_seq OWNER TO shanodin;

--
-- Name: quotes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shanodin
--

ALTER SEQUENCE public.quotes_id_seq OWNED BY public.quotes.id;


--
-- Name: commands id; Type: DEFAULT; Schema: public; Owner: shanodin
--

ALTER TABLE ONLY public.commands ALTER COLUMN id SET DEFAULT nextval('public.commands_id_seq'::regclass);


--
-- Name: errors id; Type: DEFAULT; Schema: public; Owner: shanodin
--

ALTER TABLE ONLY public.errors ALTER COLUMN id SET DEFAULT nextval('public.errors_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: shanodin
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: shanodin
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: quotes id; Type: DEFAULT; Schema: public; Owner: shanodin
--

ALTER TABLE ONLY public.quotes ALTER COLUMN id SET DEFAULT nextval('public.quotes_id_seq'::regclass);


--
-- Data for Name: commands; Type: TABLE DATA; Schema: public; Owner: shanodin
--

COPY public.commands (id, command_name, command_text, command_uses) FROM stdin;
16	resourcepack	I am using PureBDcraft, which you can get here: https://bdcraft.net/downloads/purebdcraft-minecraft/	0
17	retweet	Hey - retweeting my "go live" tweet and encouraging people to come and join in is a great free way to support me. https://twitter.com/shanodin	0
56	bingo	A list of goals that can be completed. Starting with 0 required and more being added via donation incentives. Current required squares:	7
45	raid2	VirtualHug This is a Grub Club raid! WE GRUB YOU VirtualHug	52
1	morning	Morning all	81
12	hydrate	SabaPing Take a sip SabaPing	3
39	addcommand	commandname commandtext	0
10	grub	hollowGrub hollowGrub GRUB! hollowGrub hollowGrub	1
44	raid1	shanodG This is a Grub Club raid! WE GRUB YOU shanodG	54
27	bonk	shanodFp That's gonna leave a mark shanodFp	7
23	language	English only please, Solamente ingles por favor, Anglais seulement s'il vous plaît, Nur auf Englisch bitte, Kun Engelsk takk, يرجى التحدث باللغة الإنجليزية, Béarla amháin le do thoil, Endast engelska Tack, англий?кий только пожалуй?та, Alleen engels alsjeblieft, Proszę pisac po angielsku	1
48	switch	Friend code: 5099-3416-4700	1
50	backseat	Please mind the backseating until asked by strimmer.	6
36	december	Happy Holidays! Get in on the Grub Club Christmas Tree https://bit.ly/36IGamI // sub or resub for a bauble // 100 - 999 bits or £1 - £9.99 tip for fairy light // 1000+ bits or £10+ tip for a gift under the tree // gift 5+ subs for some tinsel	23
28	charity	 SpecialEffect is a UK-based charity which uses video games and technology to enhance the quality of life of people with disabilities. Find out more at www.specialeffect.org.uk	39
37	nuzlocke	I am using the rule set laid out in the "Mandatory Nuzlock Rules" section on this page https://bit.ly/33FMGIX	6
51	gameblast	The Grub Club are taking part in #gameblast21 to raise money for Special Effect! Join us 11am Sun 28th Feb (GMT) for our awesome 8-hour charity stream! Donate here! https://tiltify.com/@shanodin/grub-club-for-special-effect	8
29	mods	Here's a list of the Skyrim mods used in today's Cheese Quest for Gendered Intelligence: https://shanodin.co.uk/skyrim-mod-list/	8
8	ellie	If you love my community I bet you could find a home over with EllieJoyPanic at twitch.tv/elliejoypanic - she plays "hard and soft" games like Bloodborne and Animal Crossing.	18
6	cat	(=ↀωↀ=)	37
34	lifegoals	StinkyCheese STEAL THE CHEESE StinkyCheese	3
46	merch	Guess what?! You can now support The Grub Club and shanodin by buying merch! https://merch.streamelements.com/shanodin - get grubby.	13
15	psyche	If you love purple and also spaaaace, I know you'll love Psyche over at twitch.tv/psyche. She's an absolute master of Elite: Dangerous, and her chat is full of hilarious people and commands (try !hot and !pls)	16
18	safety	Safety kick!	8
38	rip	Fade (Scorbunny d. 04.12.2020) | Johno (Vulpix d. 08.12.2020)	12
14	music	This stream uses Chillhop, free music for creators! Check it out here: https://chillhop.ffm.to/creatorcred	5
35	lurk	We Love Lurkers shanodG	52
40	roster	Sam (Corvisquire) | Ouro (Gyarados) | Angedelo (Vileplume) | Tom (Sirfetch'd) | Natabee (Vespiquen) | Justin (Drilbur)	10
31	cheesecount	103	22
43	patreon	Please consider supporting shanodin on Patreon for even more content and a way better money in/money out ratio www.patreon.com/shanodin	0
7	discord	Come and join shanodin's stream team on discord https://discord.gg/wY54XJg we'd love to have you there.	132
54	gorb	shanodG ASCEND! shanodG	7
42	pronouns	We recommend the Chrome extension for viewing pronouns in Twitch chat (Firefox version in dev). Set up your pronouns for anyone who uses the extension to see (even if you can't use it yourself) https://pronouns.alejo.io/ || download the extension and see other's pronouns: https://tinyurl.com/y4lekkx9	1
21	water	shanodLol Water is good, and you should drink some! shanodLol	6
55	rando	All items, spells, skills, relics, rancid eggs, Dreamers, charms, keys, geo chests, mask shards, vessel fragments, pale ores, and charm notches have had their locations randomised!	1
41	quiz	https://bit.ly/38Rz0fG	7
19	shaders	I am using Sildur's Vibrant Shaders - get them here: https://sildurs-shaders.github.io/downloads/	1
32	cheese	You mean solid milk?	8
59	newhome	I guess I live here now?	6
11	humble	I am a Humble Partner. If you use my partner link to buy games from the Humble store, you can support me and also the charity Shelter. Here's the link: https://www.humblebundle.com/store/?partner=shanodin	3
9	gfx	My axolotl emote was made by LootboxGFX. I highly recommend them, their work is amazing and they were so accommodating to work with. https://twitter.com/LootboxGFX to get in touch.	11
4	blog	My latest blog post can be found here: https://shanodin.co.uk/blog/	7
49	arewethereyet	No backseating, dammit!	1
20	stop	shanodLol Stop reading chat! shanodLol	45
5	bye	EarthDay Bye, have a good time zone. EarthDay	34
60	butt	BUTT!	6
47	save	A Good Point To Save Hard	18
57	who	I'm streaming with some awesome fellow fundraisers from Team Panic - check them out here! https://twitter.com/elliejoypanic/status/1363674521459326979?s=20	2
58	hugs	shanodHug shanodHug shanodHug shanodHug shanodHug shanodHug shanodHug	5
30	donate	https://www.justgiving.com/fundraising/grub-club-nas	44
22	pockets	Pockets ain't empty cuz!	37
2	danger	shanodFine Danger Heal! shanodFine	33
3	bit	If you enjoyed my Hollow Knight content then I know you'll love bit_heist - follow him over on twitch.tv/bit_heist where he streams randomisers, bingos, and speedruns.	18
61	game	Today we're playing a game called Lacuna, a modernised point and click set in a noir city. Check it out here: https://uberstrategist.link/Shanodin-Lacuna and wishlist/buy it on Steam today!	16
64	autismama	I am answering questions about autism! Please either ask your question in chat or submit anonymously here: https://forms.gle/f75oFGmUHkg72hnV9	6
62	buttsbot	buttsbot is a bot that replaces random parts of random messages with "butt". Use the command !ignoreme to get buttsbot to ignore your messages	2
63	rkg	shanodin is a proud member of Team Radically Kind Gamers, aiming to spread love and kindness through gaming. Find the other team members on the team page: https://www.twitch.tv/team/radicallykindgamers && find out more on the team Twitter: https://twitter.com/RKGamersTeam	0
65	AutismAMA	I am answering questions about autism! Please either ask your question in chat or submit anonymously here: https://forms.gle/f75oFGmUHkg72hnV9	0
\.


--
-- Data for Name: errors; Type: TABLE DATA; Schema: public; Owner: shanodin
--

COPY public.errors (id, error_code, error_details, error_time) FROM stdin;
1	\N	\N	2021-02-03 21:06:53.278717+00
2	\N	\N	2021-02-10 18:55:32.619203+00
3	\N	\N	2021-02-19 16:03:39.630867+00
4	\N	\N	2021-02-19 16:27:26.706986+00
5	\N	\N	2021-02-23 18:22:42.857224+00
6	\N	\N	2021-03-10 14:14:57.095408+00
7	\N	\N	2021-03-21 16:39:06.651181+00
\.


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: shanodin
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
4	20200909202327_commands.js	1	2020-10-24 20:39:04.725+00
5	20200915113245_errors.js	1	2020-10-24 20:39:04.77+00
6	20200926193906_quotes.js	1	2020-10-24 20:39:04.777+00
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: shanodin
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: quotes; Type: TABLE DATA; Schema: public; Owner: shanodin
--

COPY public.quotes (id, quote_text, quote_uses, quote_game) FROM stdin;
2	I am now a bunny gun!	0	Donut County
3	Where’s the apostrophe?!	0	Quiplash
4	Fooled with Dongoose’s bedsheets	0	Jackbox
5	The game won’t let me put my hand in the hole!	0	Heaven's Vault
6	There's plenty of ways in, you've just gotta get inventive.	0	Heaven's Vault
7	Let's get down into this death trap.	0	Heaven's Vault
8	nobody likes sticky goop	0	
9	if you thinking watching me is frustrating, you should try being me.	0	Outer Wilds
10	I want in. Let me land on you!	0	Outer Wilds
11	They're already hard, don't make them harder.	0	Bastion
12	Oh no, squirt popcorn	0	Bastion
13	Does that reduce the number of little peckers that attack you?	0	Bastion
14	Attacked by a giant pecker. It's my worst fear	0	Bastion
15	I need you to die now, Pecker	0	Bastion
16	I love technology as much as the next person, I just don't necessarily want to take it to bed with me.	0	Bastion
17	Get stabbed, pecker.	0	Bastion
20	Supper is not a thing.	0	
22	The jars, the jars!	0	Hades
23	Lasers are rude.	0	Hades
24	That little skull's got my thingy!	0	Hades
25	Die jars, die.	0	Hades
26	If this game teaches anything, it's that pot is bad.	0	Hades
27	No authority for you, get dead.	0	Hades
28	I'll just dash about giving you all hangovers with my foot-wine	0	Hades
30	You can do all kinds of things with dwarves	0	Lego Hobbit
31	Get your big ole hammer out	0	Lego Hobbit
32	Oh no, I dropped my sausage	0	
33	Plop a sausage on the table.	0	Lego Hobbit
34	squeezing the tofu is less weird than ketchup on the pad thai.	0	
35	Bin me!	0	Viscera
37	an extreme dildo	0	
38	No one wants a lively cat up the bum	0	
40	Your leg's in your lunchbox	0	
41	I'm very excited to grow myself a lumpstump	0	Ooblets
42	I need a seaplop	0	Ooblets
43	Let me just rearrange my legs	0	
44	Look at me! I've got a glowing head!	0	
45	Ow, he hit me with his big fat belly	0	
49	I guess I am going down the big hole	0	
51	Don't bumblast me	0	Hollow Knight
52	Oh no! Nonononono! No.	0	Hollow Knight
53	Stop it jumpy man	0	Hollow Knight
56	Hi! *stabs*	0	Hollow Knight
57	Why does this place exist	0	
58	You're mean and you have a spiky face.	0	
59	I said bench, not death.	0	HK
60	I've got a gun, but I do walk in acid.	0	
61	I don't have any soul	0	HK
62	Ow, no! He spanked me!	0	
63	Give me your soul, I'm nearly dead.	0	HK
64	Oooh, you've got a big face!	0	Animal crossing
65	what was past me thinking, stashing all these sharks?	0	
67	The world nearly landed on my head. That's right gang. The whole world	0	HK
68	It's more bottom.	0	HK
70	This is looking pretty dire. *Dies*	0	HK
71	You're not a friend, you exploded.	0	HK
72	Where did I leave my corpse?	0	
73	My mum is very much still using her skull	0	Griftlands
74	No-one here is a friend really	0	HK
75	I am getting fucked up by some long boys	0	HK
77	Oh, nice big chest.	0	
80	hollow knight continues to be an absolute bastard of a delight	0	HK
82	80 quotes! Wow. Surely not all of them are funny.	0	
83	I like soggy vagabonds (Angedelo)	0	
84	Ou est le hole?	0	HK
86	I'm quite sloppy with my analogue stick	0	HK
87	Humans are terrible	0	
88	Go for a walk, have a snack!	0	
90	I would like your ability to swim in the poo sir	0	
91	Don't kill me sir, I'm busy	0	HK
92	Nice pile of men.	0	Thief
93	nice pile of men	0	thief
95	Just the tip, mind you.	0	Thief
96	Paint me like one of your French grubs	0	HK
97	Spiderlegs mcGee, that's what they call me	0	
47	Spreaders always f*ck me right up	1	Hades
66	I think I'm saving the world, but I don't really know how	1	
69	Nice	1	
78	I'm a soggy vagabond	1	
98	I would like to thank not looking at chat for my success	1	HK
81	My fingers are all sweaty now. From focusing	1	HK
18	I can stab the peckers from a distance!	1	Bastion
29	Lava bad. Lava hot.	3	Hades
50	Ooh, he's big.	1	
55	Look, it's a big dragon penis again!	1	
36	Just ramming my mop into your penis	2	
48	No thank you sir, not today. Please, infact, perish.	1	
76	Ahhh, sweet, sweet, sooul from a dragon penis.	1	
19	Didn't even notice that blinking pecker!	1	Bastion
54	Don't land on my head, that's so rude!	1	HK
21	The wet uncle again.	1	Hades
94	There surely can't have been 91 things I've said that are worth quoting	1	
39	Don't you wave your mop at me mister	1	Viscera
89	smack the penis! (fluzz)	2	
46	I will bother the dog as much as I like	1	Hades
79	dodged his balls	1	HK
99	Friends. I'm wierd and spooky	2	
101	Give me your organs - it's the least you can do.	0	
102	Snacks are snacks but dinner is dinner.	0	
104	I'm gonna die; I'm gonna die; too fast *promptly succeeds*	0	HK
106	Looks like my face is going to be on something	0	
107	I take egg! I take egg! I take egg?! NO! RUDE!	0	
108	Once you fall down it is quite hard to recover. Because you are a jellybean.	0	
109	I was trying to do a spell, but I didn't have enough spell juice.	0	HK
110	Just bounced into his big ole' belly.	0	HK
111	I really like killing them because I hate them so much.	0	hk
113	Everyone loves a heroic odour	0	HK
114	Stop leaking on me	0	
115	Hey don't hit me, just let me kill you.	0	HK
116	Gete titted watcher knights.	0	HK
117	oh no, that one's coming to life before my very face.	0	HK
118	no, no, no, ohh oooohhhhh!good dodges)	0	HK
119	I wanna nail this tree.	0	HK
120	Not right now cat, I'm platforming	0	
121	Love to have an unsettling smell.	0	HK
123	Mmmm, love to cook pocket-corn	0	
124	They make a real good angry face when they turn their arses into drills and attack me.	0	HK
125	Go away, spiky bum	0	
127	Honestly, to me it looks like a weird boob with a nipple on the end.	0	HK
129	Take a fireball to the face, thank you.	0	HK
130	No, not no, yes.	0	
131	Look at your rips	0	
132	She wants to be on me	0	
133	Get your goats in chat, everyone.	0	
134	This is a very balanced game of egg.	0	
135	I've got a nice grub	0	
136	afk, sausage selection time (Fluzzle)	0	
137	I want chips Goddammit!	0	
138	I'll open some weird sacs	0	
139	The murder is trivial	0	
140	The rest of us were eaten by the Hulk Hogan	0	
142	I dont see any Angedelo getting mined (Angedelo)	0	No Man's Sky
143	These plants can suck a dick.	0	NMS
144	I didn't want your scaly meat	0	NMS
145	I wish I could turn into a missile	0	HK
146	What are you doing over here, you bloody ninnyto shade	0	HK
147	It's difficult to pogo on those bees and their aggressive bottoms.	0	HK
148	I can't take his clothes, he's gone	0	
149	Oh, sorry, didn't see you there sir; please forgive me. *proceeds to stab twice*	0	DS
150	I spanked him on the arse!	0	
151	No point crying over spilt souls	0	Dark Souls
152	Killed a big demon. Fucked by a dragon.	0	
154	Leave me be, I'm busy.	0	HK
155	I'll just set my legs in focus position.	0	HK
157	Oh! Fuck! I pressed the button!	0	HK
158	Please, one of you, come!	0	
159	You're extremely cute, but I would like to kill you.	0	DS
161	No, no, no, all my pig souls!	0	DS
163	I would like you to not.. ah, crapping crapsuckers.	0	DS
164	no, i want to pillage that corpse!	0	Dark Souls
165	!addquote	0	
166	Why did you add an addquote quote?	0	
167	That's good, otherwise my birthday would've been the 26th of August; and that's much harder to say.	0	
170	His spiky head can get fucked.	0	HK
171	I am benevolent with my tailoring	0	AC
172	Dodge the marmalade!	0	HK
173	i mean i'm not very sociable, doesn't make me a chicken/jewel thief (Rox)	0	
174	it wasn't dangerous, if I'd healed!	0	
176	I did mildly experience a death	0	DS
177	look at that thrust	0	
178	A gentle touch of the doober	0	DS
181	Let's get a thrustier weapon	0	DS
182	Two metres is approximately an extra third of a Shanodin	0	
183	I don't want to read about feral lasagnes again, they frighten me.	0	
184	pls dont spank me	0	
185	Ooh, No. no.no.no. Fuck.	0	HK
187	why do you have a lightning head?!	0	Dark Souls
188	Danger boob!	0	
189	My boobs are extremely dangerous	0	HK
190	The angriest bums I've ever seen	0	
191	you have to sit up straight to fight a boss	0	
193	I'm just generally Queer.	0	
194	One at a time for the licking	0	
195	why do you keep a demon in your basement, andre?! honestly!	0	
196	I would like to talk to the big bird	0	
100	I don't want to pick that up! It could be murder! - Shanodin	1	
169	Just do me now mate	1	
192	Please don't lick me sir	1	
180	Check out the thrust on this weapon. Very thrusty.	1	
160	I would poke you in the rear please?	1	
162	Alice can have a little level up as a treat?	1	DS
105	I think I put a mimic in the toilet	1	
175	You can't just KNOW all the things	1	
168	cock goblins	1	
153	I messed up with my murderous ways.	1	HK
156	I'm stuck, what do I do? Panic and die.	1	HK
141	Harvest a bit of moonwolfprime	1	
128	It's not that I've missed the hole, I'm concerned about being able to get back up it.	1	HK
126	Get in me!	1	
179	Maybe I've learned the folly of my danger healing ways	1	DS
186	It thrusts better in these corridors.	2	DS
122	This is a pretty big dragon penis.	2	HK
197	Let's put on some black leather, shall we?	0	
199	I'm on team stabbing this guy up the bum loads	0	
200	I don't want to think about gerbils within the context of my arse	0	
202	I can hear it throbbing and beating	0	HK
203	dont pin me to a wall	0	
205	dont get poo'd on	0	
206	Hey look, we could plummet to our death.	0	
207	Peekaboo	0	
208	Oh a toilet! Lovely.	0	
209	Love to be in a hole.	0	
210	I like good long stabs	0	
211	i didn't assassinate him he just died	0	
212	Just let me pogo on your head.	0	
214	Look it's all wiggly!	0	
215	I don't want the business end anywhere near me... that's not what i requested, it's all wiggly	0	
216	Can we get back to gaping dragons with wiggling front ends now?!	0	
217	I feel good with a massive sword	0	
218	Are you attacking me a with a corpse?	0	
219	That is a BIG thrust	0	
220	I did the ding dongs	0	
222	I want a big roly poly belly!	0	
223	It's got a willy!	0	
225	Don't look at the penises, and we'll be okay.	0	
227	There was just wangs and breasts, all flapping away	0	
228	I am sooo sick of skeletons up my arse!	0	
230	I've officially got a vendetta with people around corners.	0	
231	Right up the butt, that's where I like to stick it	0	
232	I do not want to be under your legs, thank you.	0	
233	That was far too aggressive with the tentacles.	0	
1	How can I get this carrot out of my hole?	1	Donut County
235	I can't upgrade the size of my multitool	0	\N
236	we all are distracted by shifting and pulsating	0	\N
237	I'm gonna have to go in the back end	0	\N
112	that's a good way to finish off the big ones; put them on the spikes so the babies die to the spikes too.	1	HK
270	Big ole furnace butt	0	\N
238	maybe I'm a dingus?	7	\N
239	"Point your squishy parts at me"	0	\N
240	"You know, I'm good with regular amounts of eyes."	0	\N
256	I don't like you, you've very healthy.	1	\N
242	Sir, get ye to fuck	0	\N
243	That's just a pustule, good.	0	\N
103	Let's do some competent platforming! *dies instantly* 	2	
271	"You did a little hype train with all your silly noises"	0	\N
244	I'm not keen on these big, hairy, tentacles	0	\N
272	"I like willy (ouroboros)"	0	\N
245	enter sprinkle mode!	0	\N
246	I flipped the chop	1	\N
247	Hey, I like your tongue	0	\N
248	let me touch you!	0	\N
249	"It's really difficult for me to imagine warmth."	0	\N
250	Can I just sit in this cardboard box until daytime?	0	\N
288	I am a tyrant.	0	\N
251	"Look, I only murdered the people chat told me to."	0	\N
204	lots of 69s	1	
241	please sir, what are you doing to my face?!	1	\N
273	That bird ate my parsnip!	0	\N
229	I haven't got a bow that shoots fucking fenceposts	4	
254	Super paranoid about rubbing an eye off my face	0	\N
255	Do you have any pocket cheese?	0	\N
201	I love that it has a thrust	2	
257	It's like Christmas, except instead of delivering presents, I'm taking cheeses away (Cheese quest)	0	\N
259	I don't care what you're saying, you have no cheese	0	\N
260	Soft flesh wedge!	0	\N
261	Why are you all naked?!	0	\N
262	If you're dead, are you dead?	0	\N
264	Action Man has skin, he just doesn't have a penis..	0	\N
265	Oh no, not butterflies!	0	\N
221	Bollocks, they come fast	1	
266	It's about dead bodies, I'm really looking forward to reading it	0	\N
258	Jingle Bells, Blue Cheese smells, mostly made from whey. Have no fear, Shanodin's here, to take your cheese away. (HunterL)	1	\N
267	Not a big fan of "hostiles nearby"	0	\N
268	Sometimes we live in the cupboard	0	\N
269	You're going to be a bauble on my Christmas tree	0	\N
274	come back you need to be slaughtered	0	\N
275	I resent sandwiches	0	\N
281	I know where I am! That never happens.	0	\N
276	England is bad	0	\N
277	I'm so angry, I died.	0	\N
278	I will give you ASMR with my pussy	0	\N
224	There's a lot more wangs than I thought there would be, to be honest.	1	
279	The first rule of grub club is respect everyone, except, you know, cunts	0	\N
282	"SIR. You have a very big stick."	0	\N
283	That tree might have been villainous!	0	\N
284	Excuse me! You're much too large!	0	\N
286	ah yess... I cry in my piles of money as well.... wait... no.. i forgot I keep my money the same place i keep my fucks. And I have none of either (dovahkinsin)	0	\N
234	I was in a menu! How dare you!	1	
287	Process my metabolism go faster	0	\N
280	He's got a big pot and he's not afraid to use it	2	\N
289	Are you just gonna come?	0	\N
290	I am also kind of flimsy, but I'm not naked at least!	0	\N
198	Hit on the head by a big ball of poo.	1	
213	There's no such thing as a free dab	1	
226	Look at how realistic those cabbages look!	1	Skyrim
285	He does have big wood	1	\N
253	Did I win?	1	\N
252	Curse you, tiny incline!	2	\N
291	It's very bleak here isn't it	0	Dark Souls
85	You probably shouldn't shag anything in Hollow Knight	1	HK
293	I need to dump my head in some wax	0	\N
294	What is steak and bj day? Can I get involved?	0	\N
295	traverse the frog	0	\N
296	It's 2021, there is always time and reason for the creamining. (Dovah)	0	\N
297	Let's get my wood out	0	\N
298	Sir, are you tasty?	0	\N
299	"Axing is better than fisting. Okay" Valheim	0	\N
300	I got murdered before I could put my pants on!	0	\N
301	"It's nearby, I've got a spell... It'll be fine!"	0	\N
302	"I just panicked in the right order."	0	\N
303	Oh! Fucking socks!	0	\N
304	Please participate in the crime	0	\N
292	How is it so big?!	1	\N
305	"Oh, one of my eyes fell off"	0	\N
306	maybe I go back in and wave a book at it?	0	\N
307	"I have an aptitude for boning" Phasmophobia	0	\N
308	We're about to blow up a lawyer.	0	\N
309	Poo on a poo basket	0	\N
310	why are your legs so hairy, soup daddy?	0	\N
311	I would prefer it if you would slow down and just perish	0	\N
312	'i swear to god someone has stolen my zester' Angedelo.	0	\N
313	Aw, all the corpses are gone!	0	\N
314	I would like to clarify that I am not a butt goblin	0	\N
315	I just wanna shoot people	0	\N
316	Ooops, I pressed a button. Now I appear to be invisible. (Titanfall 2)	0	\N
317	Maybe I should buy a new deer. because when the current one grows up I have to give it to one of the bears.	0	\N
318	"That made the stomach drop out of the bottom of my...well, stomach" HZD	0	\N
319	"Well, I hope this is the right train"	0	\N
320	"Not Spain, the other one."	0	\N
321	"I'm going to tell you my story about cat pee. You're going to sit there, and you're going to like it!"	0	\N
263	If you're both dead, is it really murder if you kill the other person and eat them?	1	\N
322	I can't believe you've done this	0	\N
\.


--
-- Name: commands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shanodin
--

SELECT pg_catalog.setval('public.commands_id_seq', 65, true);


--
-- Name: errors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shanodin
--

SELECT pg_catalog.setval('public.errors_id_seq', 7, true);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shanodin
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 6, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: shanodin
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: quotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shanodin
--

SELECT pg_catalog.setval('public.quotes_id_seq', 322, true);


--
-- Name: commands commands_command_name_unique; Type: CONSTRAINT; Schema: public; Owner: shanodin
--

ALTER TABLE ONLY public.commands
    ADD CONSTRAINT commands_command_name_unique UNIQUE (command_name);


--
-- Name: commands commands_pkey; Type: CONSTRAINT; Schema: public; Owner: shanodin
--

ALTER TABLE ONLY public.commands
    ADD CONSTRAINT commands_pkey PRIMARY KEY (id);


--
-- Name: errors errors_pkey; Type: CONSTRAINT; Schema: public; Owner: shanodin
--

ALTER TABLE ONLY public.errors
    ADD CONSTRAINT errors_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: shanodin
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: shanodin
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: quotes quotes_pkey; Type: CONSTRAINT; Schema: public; Owner: shanodin
--

ALTER TABLE ONLY public.quotes
    ADD CONSTRAINT quotes_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

