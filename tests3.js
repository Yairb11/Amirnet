// שאלות נוספות לכל מבחן: w1, w2 = פרקי השלמת מילים (מילה חסרה אחת), r2 = פרק ניסוח מחדש שני.
// הפרקים הקיימים של כל מבחן: s = השלמת משפטים (פרק 6), p = קטע קריאה (פרק 3), r = ניסוח מחדש (פרק 4).
const EXTRA = [
  { // מבחן 1
    w1: [
      Q("Her sudden ______ from the company surprised colleagues, who had expected her to stay for years.", "resignation = התפטרות.", "resignation", "inauguration", "expansion", "assessment"),
      Q("Because the soil was so ______, almost nothing would grow in the field.", "barren = עקר, צחיח.", "barren", "fertile", "moist", "ample"),
      Q("The company tried to ______ the scandal by firing the executives involved.", "defuse = לנטרל, להפחית את המתח.", "defuse", "provoke", "document", "celebrate"),
      Q("He was too ______ to admit that he had made a mistake.", "obstinate = עיקש.", "obstinate", "flexible", "gullible", "timid"),
    ],
    w2: [
      Q("The ______ of the storm left the entire town without electricity for a week.", "ferocity = עוצמה פראית.", "ferocity", "brevity", "absence", "novelty"),
      Q("A good teacher should ______ curiosity in students rather than merely require memorization.", "cultivate = לטפח.", "cultivate", "suppress", "imitate", "confiscate"),
      Q("The stock market remained ______ despite the rumors, with prices barely moving.", "stable = יציב.", "stable", "erratic", "fragile", "hectic"),
      Q("The explorers faced ______ conditions: freezing temperatures, little food, and constant storms.", "inhospitable = בלתי נוח לחיים, עוין.", "inhospitable", "temperate", "comfortable", "familiar"),
    ],
    r2: [
      Q("Although the proposal had merit, it was rejected on the grounds that it was too costly.", "Although = למרות; נדחתה בגלל העלות.", "The plan was turned down because of its price, despite its advantages.", "The proposal was rejected because it had no merit, according to the officials.", "The plan was approved even though it was costly.", "The cost was reduced so that the plan could be accepted, according to the council."),
      Q("Scarcely any of the participants completed the survey, which was lengthy and confusing.", "Scarcely any = כמעט אף אחד.", "Almost nobody finished the long, confusing survey.", "Most participants completed the survey despite its length.", "The survey was brief and easy to complete.", "The participants found the survey lengthy but clear."),
      Q("The company has yet to turn a profit, notwithstanding years of heavy investment.", "notwithstanding = למרות.", "Despite years of large investments, the company has still not made a profit.", "The company became profitable after years of investment.", "The company has avoided investing because it is unprofitable, according to its latest report.", "Heavy investment is the cause of the company's profits."),
    ],
  },
  { // מבחן 2
    w1: [
      Q("The ______ evidence left the court with no doubt about the defendant's guilt.", "conclusive = חותך, מכריע.", "conclusive", "ambiguous", "flimsy", "irrelevant"),
      Q("The new law will ______ the sale of tobacco to minors.", "prohibit = לאסור.", "prohibit", "encourage", "subsidize", "predict"),
      Q("The tourists were ______ by the breathtaking view and stood silently for several minutes.", "awestruck = נפעם.", "awestruck", "bored", "irritated", "deceived"),
      Q("A ______ amount of rain fell in the desert this year, barely enough to wet the ground.", "meager = זעום.", "meager", "copious", "torrential", "excessive"),
    ],
    w2: [
      Q("The two companies decided to ______ their resources in order to compete with larger rivals.", "pool = לאגד משאבים.", "pool", "waste", "hide", "reduce"),
      Q("The CEO's remarks were ______; he wanted to calm investors, not alarm them.", "reassuring = מרגיע.", "reassuring", "ominous", "provocative", "irrelevant"),
      Q("He is a ______ reader who finishes several books every week.", "voracious = גרגרן (לקריאה).", "voracious", "reluctant", "careless", "gradual"),
      Q("The patient's condition is ______; doctors say it could improve or worsen at any moment.", "precarious = לא יציב, מסוכן.", "precarious", "robust", "predictable", "cheerful"),
    ],
    r2: [
      Q("The proposal was endorsed by all but two members of the board.", "all but two = כולם חוץ משניים.", "Only two board members did not support the proposal.", "Only two board members supported the proposal, according to the minutes.", "All board members rejected the proposal, according to the report.", "The proposal was endorsed by exactly two members, according to the chairman."),
      Q("Seldom does a theory withstand such rigorous testing and emerge unscathed.", "Seldom = לעיתים רחוקות.", "Few theories survive such strict testing without damage.", "Most theories pass strict tests without damage, according to many scientists.", "This particular theory failed under strict testing, according to the reviewers.", "Theories are rarely tested at all."),
      Q("The athlete, though injured, insisted on competing.", "though = אף ש-.", "Despite being hurt, the athlete refused to withdraw.", "The athlete competed because the injury had healed, according to his coach.", "The athlete withdrew because of the injury, as the newspapers reported.", "The athlete insisted that others compete, despite the risks involved."),
    ],
  },
  { // מבחן 3
    w1: [
      Q("Years of drought left the farmers ______, with no savings and no crops.", "destitute = חסרי כול.", "destitute", "affluent", "indifferent", "jubilant"),
      Q("The scientist was ______ in her research, checking each result three times before publishing.", "diligent = חרוץ.", "diligent", "negligent", "impulsive", "lethargic"),
      Q("Rain is ______ in the tropics, falling almost every afternoon.", "commonplace = דבר שבשגרה.", "commonplace", "unheard-of", "negligible", "implausible"),
      Q("The ______ of her argument made it impossible for the audience to disagree.", "cogency = כוח שכנוע לוגי.", "cogency", "vagueness", "brevity", "inconsistency"),
    ],
    w2: [
      Q("The bridge was closed because engineers found it was structurally ______ and might collapse.", "unsound = רעוע.", "unsound", "elegant", "innovative", "historic"),
      Q("The speaker's ______ tone made it clear that she regarded her opponents with contempt.", "disdainful = מבזה.", "disdainful", "humble", "enthusiastic", "diffident"),
      Q("To ______ the risk of fire, the factory installed a new sprinkler system.", "mitigate = להפחית, למתן.", "mitigate", "increase", "ignore", "calculate"),
      Q("The old oak tree, ______ by lightning, stood split down the middle.", "scarred = צלוק.", "scarred", "nourished", "admired", "planted"),
    ],
    r2: [
      Q("He would have accepted the offer had the salary been higher.", "תנאי בלתי אפשרי בעבר: לא קיבל כי המשכורת נמוכה.", "He declined because the salary was too low.", "He accepted because the salary was high, according to his wife.", "He accepted despite the low salary, as his friends had advised.", "He will accept if the salary rises, according to his lawyer."),
      Q("The more complex the machine, the more likely it is to break down.", "The more... the more.", "Complicated machines tend to fail more often.", "Simple machines tend to fail more often, according to engineers.", "Complexity makes machines more reliable, according to some designers.", "Machines break down regardless of complexity, as most engineers agree."),
      Q("Contrary to expectations, the new restaurant attracted few customers in its first month.", "Contrary to expectations = בניגוד לציפיות.", "The restaurant had fewer customers than anticipated in its first month.", "The restaurant attracted many more customers than expected, according to the owner's statement.", "The restaurant closed in its first month.", "Customers expected the restaurant to be empty."),
    ],
  },
  { // מבחן 4
    w1: [
      Q("The audience gave the performer a ______ ovation that lasted several minutes.", "thunderous = רועם.", "thunderous", "grudging", "faint", "muted"),
      Q("The mayor refused to ______ to the demands of the protesters.", "yield to = להיכנע ל-.", "yield", "object", "attend", "refer"),
      Q("The explorers were ______ after crossing the desert on foot for ten days.", "depleted = מותשים.", "depleted", "invigorated", "indifferent", "relieved"),
      Q("Teachers should avoid ______ criticism; students respond better to constructive feedback.", "gratuitous = מיותר, חסר הצדקה.", "gratuitous", "constructive", "precise", "honest"),
    ],
    w2: [
      Q("Her ______ manner made her an excellent negotiator; she never lost her temper.", "composed = קר רוח.", "composed", "excitable", "brusque", "careless"),
      Q("The disease has been ______ in this region since the 1990s, with virtually no new cases.", "eradicated = הושמד.", "eradicated", "spread", "ignored", "diagnosed"),
      Q("It is ______ to expect immediate results from a policy that takes years to implement.", "unrealistic = לא מציאותי.", "unrealistic", "prudent", "customary", "admirable"),
      Q("The ______ sound of the waves put the baby to sleep.", "soothing = מרגיע.", "soothing", "deafening", "jarring", "startling"),
    ],
    r2: [
      Q("The governor has been criticized for failing to respond promptly to the crisis.", "criticized for failing = ביקורת על שלא הגיב מהר.", "People have blamed the governor for reacting too slowly to the emergency.", "The governor was praised for his swift response.", "The governor caused the crisis by acting too quickly, according to his critics.", "The crisis ended because of the governor's response."),
      Q("Hardly had she finished her speech when the audience began to applaud.", "Hardly... when = מיד כשסיימה.", "The audience started clapping as soon as she ended her speech.", "She finished speaking after the audience applauded, according to the organizers.", "The audience left before the speech ended.", "The audience applauded throughout her speech, according to the reporters."),
      Q("The study found no significant difference between the two teaching methods.", "no significant difference = אין הבדל משמעותי.", "Both teaching methods produced essentially the same results.", "One method was clearly better than the other, in most of the trials.", "The study examined only one teaching method, over a period of two years.", "The difference between the methods was considerable, especially among younger students."),
    ],
  },
  { // מבחן 5
    w1: [
      Q("The charity relies on ______ from private donors to fund its programs.", "contributions = תרומות.", "contributions", "restrictions", "penalties", "complaints"),
      Q("The artist's work is ______ of the Impressionist style, using soft colors and light brushstrokes.", "reminiscent of = מזכיר.", "reminiscent", "critical", "ignorant", "protective"),
      Q("After the ______ of the dictator, the country held its first free elections.", "overthrow = הפלה.", "overthrow", "praise", "coronation", "birthday"),
      Q("Heavy fog ______ the pilots' visibility, forcing flights to be delayed.", "impaired = פגע ב-.", "impaired", "enhanced", "clarified", "extended"),
    ],
    w2: [
      Q("The ______ nature of the task made it hard to finish; each step was repeated hundreds of times.", "monotonous = חד-גוני.", "monotonous", "exhilarating", "creative", "dangerous"),
      Q("The witness was ______ and refused to answer any questions.", "recalcitrant = סרבן.", "recalcitrant", "forthcoming", "grateful", "confused"),
      Q("Archaeologists ______ the ruins carefully to avoid damaging fragile artifacts.", "excavated = חפרו.", "excavated", "demolished", "abandoned", "mortgaged"),
      Q("The treaty was ______ by both countries, who signed it in a formal ceremony.", "ratified = אושרר.", "ratified", "violated", "rejected", "ignored"),
    ],
    r2: [
      Q("Little is known about the origins of the legend, which has been retold for centuries.", "Little is known = ידוע מעט.", "The legend's beginnings are largely a mystery, though people have long told it.", "The legend's origins are well documented.", "The legend was forgotten centuries ago.", "Everything about the legend is known."),
      Q("Unless the farmers receive aid, many will be forced to sell their land.", "Unless = אם לא.", "Without assistance, numerous farmers will have to sell their land.", "Farmers will sell their land even if they get aid, according to local experts.", "Aid will be given only to farmers who sell their land, according to the new law.", "Farmers who sell their land will receive aid."),
      Q("Her success is attributable more to perseverance than to talent.", "more to X than to Y.", "She succeeded mainly because she never gave up, not because she was gifted.", "She succeeded mainly because of natural talent.", "She succeeded without any effort.", "Her talent and perseverance were equally important."),
    ],
  },
  { // מבחן 6
    w1: [
      Q("The ______ of the proposal was clear to everyone: it would cost far more than it could ever save.", "folly = טיפשות.", "folly", "wisdom", "novelty", "simplicity"),
      Q("He tried to ______ responsibility by blaming others for the failure.", "evade = להתחמק.", "evade", "accept", "share", "deserve"),
      Q("The lecture was so ______ that half the audience fell asleep.", "tedious = משעמם.", "tedious", "gripping", "controversial", "humorous"),
      Q("Annual floods ______ the valley with rich silt that makes it ideal for farming.", "enrich = להעשיר.", "enrich", "deplete", "pollute", "erode"),
    ],
    w2: [
      Q("The detective's ______ led him to examine even the smallest clue.", "thoroughness = יסודיות.", "thoroughness", "carelessness", "boredom", "fatigue"),
      Q("She wrote a ______ letter, only two sentences long.", "terse = קצר וענייני.", "terse", "rambling", "lengthy", "effusive"),
      Q("The politician's ______ to the cause was questioned after he voted against it.", "commitment = מחויבות.", "commitment", "opposition", "contribution", "exposure"),
      Q("Many insects are ______ to the poison and survive repeated spraying.", "resistant = עמיד.", "resistant", "vulnerable", "attracted", "exposed"),
    ],
    r2: [
      Q("Neither of the two candidates managed to secure a majority of the votes.", "Neither = אף אחד משניים.", "Both candidates failed to win more than half the votes.", "One candidate won a majority.", "Both candidates won a majority.", "Neither candidate received any votes."),
      Q("The museum, which was renovated last year, now attracts twice as many visitors.", "twice as many = כפול.", "Since last year's renovation, the number of museum visitors has doubled.", "The museum has half as many visitors since the renovation, according to the latest figures.", "The museum was renovated because visitors doubled, according to the museum's director.", "The museum will be renovated to attract visitors."),
      Q("She was reluctant to speak, lest she say something she would later regret.", "lest = פן.", "She hesitated to talk because she feared saying something regrettable.", "She spoke freely without regret.", "She regretted not speaking.", "She wanted to speak so that she would regret nothing."),
    ],
  },
  { // מבחן 7
    w1: [
      Q("The earthquake caused ______ damage; whole neighborhoods were destroyed.", "devastating = הרסני.", "devastating", "negligible", "superficial", "cosmetic"),
      Q("Her ______ remarks about her colleagues made her unpopular at work.", "spiteful = מרושע.", "spiteful", "generous", "insightful", "optimistic"),
      Q("To ______ his argument, he cited three separate studies.", "substantiate = לבסס.", "substantiate", "refute", "abandon", "complicate"),
      Q("The ______ of the village made it hard to reach; it was miles from the nearest road.", "remoteness = ריחוק.", "remoteness", "popularity", "wealth", "size"),
    ],
    w2: [
      Q("The company decided to ______ its investment after the product failed.", "withdraw = למשוך.", "withdraw", "double", "announce", "inherit"),
      Q("The speaker had a ______ voice that carried across the entire stadium.", "booming = רועם.", "booming", "faint", "hoarse", "muffled"),
      Q("His ______ behavior at the dinner embarrassed his wife.", "boorish = גס רוח.", "boorish", "charming", "polite", "reserved"),
      Q("Without a ______ reason, the manager refused to approve the request.", "valid = תקף.", "valid", "ambiguous", "sincere", "unwritten"),
    ],
    r2: [
      Q("The results of the second experiment bear out the hypothesis proposed earlier.", "bear out = לאשש.", "The second experiment's outcome supports the earlier hypothesis.", "The second experiment disproves the hypothesis, according to the critics.", "The hypothesis was proposed after the second experiment, according to the lab notes.", "The second experiment ignored the hypothesis."),
      Q("No sooner had the company expanded than it ran into financial difficulties.", "No sooner... than = מיד אחרי.", "Immediately after growing, the company encountered money problems.", "The company expanded to solve its financial difficulties, according to its founder.", "The company's difficulties ended when it expanded, as the annual report claimed.", "The company expanded long after its financial difficulties, according to its accountants."),
      Q("Much as he admired her work, he could not recommend her for the position.", "Much as = אף ש-.", "Although he respected her work, he would not recommend her for the job.", "He recommended her because he admired her work.", "He did not admire her work but recommended her.", "He admired her work as much as the position."),
    ],
  },
  { // מבחן 8
    w1: [
      Q("The prisoner was ______ after serving only half of his sentence.", "paroled = שוחרר על תנאי.", "paroled", "executed", "convicted", "indicted"),
      Q("The sculptor's ______ hands moved delicately over the clay.", "nimble = זריזות.", "nimble", "clumsy", "idle", "rigid"),
      Q("Their friendship proved ______, surviving decades of separation.", "enduring = מתמשכת.", "enduring", "fleeting", "superficial", "strained"),
      Q("The government will ______ new taxes on luxury goods next year.", "impose = להטיל.", "impose", "abolish", "reimburse", "evade"),
    ],
    w2: [
      Q("The doctor advised the patient to ______ from strenuous exercise until the injury healed.", "refrain from = להימנע.", "refrain", "benefit", "profit", "deviate"),
      Q("The painting is a ______ of the original, so it has little value.", "replica = העתק.", "replica", "masterpiece", "prototype", "treasure"),
      Q("She spoke with such ______ that no one doubted her sincerity.", "conviction = שכנוע פנימי.", "conviction", "hesitation", "irony", "reluctance"),
      Q("The ______ of the ancient ruins attracts thousands of visitors every year.", "grandeur = הדר.", "grandeur", "squalor", "obscurity", "fragility"),
    ],
    r2: [
      Q("Rather than raise taxes, the government chose to cut spending.", "Rather than = במקום.", "The government reduced expenditure instead of increasing taxes.", "The government raised taxes instead of cutting spending, according to the opposition.", "The government both raised taxes and cut spending, according to the newspapers.", "The government cut taxes and spending."),
      Q("The novel is by no means a masterpiece, yet it remains widely read.", "by no means = בשום אופן לא.", "Although the novel is far from excellent, many people still read it.", "The novel is a masterpiece that is widely read.", "The novel is rarely read because it is not a masterpiece, according to booksellers.", "The novel is a masterpiece, but few people read it, according to most critics."),
      Q("Were the funding to be withdrawn, the project would collapse.", "Were... = אילו.", "If the funding were removed, the project would fail.", "The project collapsed because the funding was withdrawn.", "The funding was withdrawn after the project collapsed.", "The project will survive without funding."),
    ],
  },
  { // מבחן 9
    w1: [
      Q("The CEO's decision proved ______; within months the company had lost half its customers.", "disastrous = הרה אסון.", "disastrous", "profitable", "prudent", "inevitable"),
      Q("Spiders ______ their prey in webs spun from silk.", "ensnare = ללכוד.", "ensnare", "nurture", "release", "imitate"),
      Q("The soldier showed ______ in the face of danger, never once retreating.", "valor = גבורה.", "valor", "timidity", "apathy", "caution"),
      Q("It would be ______ to ignore the warnings; the risks are too great.", "foolhardy = פזיז, נטול שיקול דעת.", "foolhardy", "sensible", "prudent", "courteous"),
    ],
    w2: [
      Q("The teacher's ______ praise encouraged even the shyest students to speak.", "generous = נדיב.", "generous", "grudging", "sarcastic", "rare"),
      Q("The city's ______ population includes people from over a hundred countries.", "diverse = מגוון.", "diverse", "homogeneous", "dwindling", "uniform"),
      Q("The author's latest novel is ______ with symbolism; every scene hides a deeper meaning.", "laden with = עמוס ב-.", "laden", "devoid", "bereft", "scarce"),
      Q("They tried to ______ the dispute by hiring an independent mediator.", "settle = ליישב.", "settle", "ignite", "inherit", "document"),
    ],
    r2: [
      Q("The company's earnings fell short of analysts' predictions.", "fell short of = לא עמד ב-.", "Analysts expected the company to earn more than it did.", "The company earned more than analysts predicted, according to its own statement.", "Analysts predicted the company's earnings accurately, according to the press.", "The company earned nothing at all, not even a single cent that year."),
      Q("Only by working overtime could the team meet the deadline.", "Only by = רק על ידי.", "The team met the deadline solely because it worked extra hours.", "The team met the deadline without working overtime, according to the manager.", "The team worked overtime but missed the deadline, according to the project report.", "The deadline was extended so the team could work overtime, according to the schedule."),
      Q("The senator, along with several aides, was reported to have left the country.", "along with = יחד עם.", "Reports said the senator and some of his assistants had gone abroad.", "The senator left the country alone.", "The aides left, but the senator stayed.", "The senator reported his aides leaving the country."),
    ],
  },
  { // מבחן 10
    w1: [
      Q("The professor's ______ lectures, delivered in a flat monotone, put many students to sleep.", "soporific = מרדים.", "soporific", "riveting", "provocative", "cryptic"),
      Q("His ______ nature made him quick to take offense at the slightest remark.", "irascible = רגזן.", "irascible", "placid", "jovial", "apathetic"),
      Q("The explorers ______ a new route through the mountains, shortening the journey by weeks.", "charted = מיפו, התוו.", "charted", "forgot", "obstructed", "inherited"),
      Q("The company's ______ practices, such as hiding product defects, eventually led to its collapse.", "unscrupulous = חסר עקרונות.", "unscrupulous", "ethical", "transparent", "innovative"),
    ],
    w2: [
      Q("The diplomat's ______ response avoided offending either side.", "tactful = דיפלומטי.", "tactful", "blunt", "insulting", "abrupt"),
      Q("Floodwaters began to ______ in the afternoon, revealing a landscape of mud and debris.", "recede = לשכוך, לסגת.", "recede", "surge", "intensify", "accumulate"),
      Q("She is so ______ that she gives away most of her income to charity.", "altruistic = אלטרואיסטית.", "altruistic", "miserly", "vain", "calculating"),
      Q("The tribe's customs have remained ______ for centuries, untouched by outside influence.", "immutable = בלתי משתנה.", "immutable", "volatile", "fashionable", "fleeting"),
    ],
    r2: [
      Q("It goes without saying that safety must take precedence over speed.", "It goes without saying = מובן מאליו.", "Obviously, safety is more important than speed.", "Speed matters more than safety.", "Safety need not be mentioned at all.", "Safety and speed are unrelated."),
      Q("Given the circumstances, the committee's decision was hardly surprising.", "hardly surprising = לא מפתיע.", "In view of the situation, the committee's decision was largely expected.", "The committee's decision was completely unexpected.", "The committee decided regardless of the circumstances, according to the minutes.", "The circumstances surprised the committee."),
      Q("Her speech was as moving as it was brief.", "as X as Y = גם וגם.", "Her speech was both short and emotionally powerful.", "Her speech was long but moving.", "Her speech was brief but dull.", "Her speech was moving because it was long, according to the audience."),
    ],
  },
];
EXTRA.forEach((x, i) => Object.assign(TESTS[i], x));
