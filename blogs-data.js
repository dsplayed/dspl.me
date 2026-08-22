const blogsData = [
    {
        "slug": "blog-test-ez",
        "title": "testing if blog works",
        "excerpt": "hopefully this works, i'm too lazy to recode all this shit",
        "author": "dsplay",
        "datePublished": 1776988800000,
        "published": true,
        "unlisted": false,
        "key": false,
        "content": [
            {
                "type": "heading",
                "level": 1,
                "content": "lol"
            },
            {
                "type": "paragraph",
                "content": "So this is my first blog post. I'm not really sure what I'm doing yet\u2014just testing how everything works and seeing how content shows up."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "i hope this work bro"
            },
            {
                "type": "paragraph",
                "content": "bla bla bla"
            },
            {
                "type": "heading",
                "level": 2,
                "content": "lorem ipsum so tuff "
            },
            {
                "type": "paragraph",
                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            },
            {
                "type": "list",
                "ordered": false,
                "items": [
                    "head",
                    "parallelogram",
                    "lists"
                ]
            }
        ]
    },
    {
        "slug": "locked1",
        "published": true,
        "unlisted": true,
        "key": true,
        "encrypted": {
            "salt": "VKvlZa8p6Pt2q4vjEa34RA==",
            "iv": "utOy4ovFNVgGhL+J",
            "data": "mVHv03SIAWWBFaosu1ssyMRJ81/Tm6+puubwqmKHftBfiV2t6V/sNmDWY2tOtjFtXRtpL4+oHcLYviJueAZHJqW6EjseLHsNxK8VfkA46i9QyEsPre54cCXbs0hs6t8b8uwzg8MnXKKs2cFOIRh3X2SFdxZV5iBkEZaP4QxFarSlhm5N5OV3pYsc6oQJ9n7MoqcwGO9wXd48Gkz3WET1ZrHWYmnOxjXjyacXqrSaSftpg9uzFJTNovK2NYHm8P+bUXqWvx5KyMAsiCl46xlUV2LRX/uzDqv4xQmhuebCdXZOnQEQSkxQwu4vXcWnYYweipbtqrh4LMhDYrzzJnOKxm1fasXAfNbqFJ5sSRylLlKtg1kW12brGOD3bLw2Lz0xwtDtaNVqJrb5nIzV9wBuYxzr8d6ia3G+4BSj4irwnC7x9gvCg1L+/ux8wd6asuvg9dOdtF5T3vDLzQbk18tbnmYQkdy6Yui2qBAMgQcOXLGN3aP1rD3el2stbTKIiLMSDhrHRw+HG1eXQdpz7NKolkloROGijibkmj3lQutQ5kwFYEcLwYrYBKgZs9xcGp+WkQR1RdOHxDOrJuzS9zZk2BiMiJPjo9X0VZ6YqzPWMVtgyMjhzN00Upnt33gxURiQGF2x592n7YQ1GpT0TWN+7e9mpYSO/as+WLIfOyX+tNA3S3hML4/rcd1WEGdIFsNjM8VgcY2NFqXf+wi/sv6t0CoYlqPhnFMoKx48htCelQWvEtckoQw="
        }
    },
    {
        "slug": "how-i-accessed-600-records-of",
        "title": "how i accessed over 600 records of people anime preferences",
        "excerpt": "i found a supabase app without rls and accidentally accessed 600+ user records just by being curious",
        "author": "dsplay",
        "datePublished": 1779278400000,
        "published": true,
        "unlisted": false,
        "key": false,
        "tags": ["security"],
        "content": [
            {
                "type": "paragraph",
                "content": "so i was testing on this brand new platform. just messing around, you know how it is. i opened the app in my browser and pulled up devtools. it's basically a habit at this point - i do it for fun and never really expect to find anything."
            },
            {
                "type": "paragraph",
                "content": "but then i saw it was using supabase. and sometimes supabase apps are really fragile if the developer doesn't set up row level security properly. so i got curious."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "the discovery"
            },
            {
                "type": "paragraph",
                "content": "i opened the network tab and started looking at what the frontend was talking to. saw requests going to a supabase project url with an anon key and a jwt token in the headers. this is what a typical request looked like:"
            },
            {
                "type": "code",
                "language": "bash",
                "label": "network request",
                "content": "GET /rest/v1/anime_list?select=* HTTP/1.1\nHost: xxxxxxxx.supabase.co\napikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9..."
            },
            {
                "type": "paragraph",
                "content": "the anon key is supposed to be public. the jwt token is what identifies you. the backend should be checking that jwt against row level security policies before letting you see anything."
            },
            {
                "type": "paragraph",
                "content": "i copied both into insomnia to start poking around. but here is where it gets interesting - i forgot to add the jwt token to my request. and it still worked."
            },
            {
                "type": "code",
                "language": "bash",
                "label": "request without jwt",
                "content": "curl -X GET \"https://xxxxxxxx.supabase.co/rest/v1/anime_list?select=*\" \\\n  -H \"apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\""
            },
            {
                "type": "paragraph",
                "content": "no jwt. no authorization. just the public anon key. and the api returned a full list of records. no filtering. no access control. nothing."
            },
            {
                "type": "paragraph",
                "content": "i tried pagination. asked for 1000 records at once."
            },
            {
                "type": "code",
                "language": "bash",
                "label": "pagination test",
                "content": "curl -X GET \"https://xxxxxxxx.supabase.co/rest/v1/anime_list?select=*&limit=1000\" \\\n  -H \"apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\""
            },
            {
                "type": "paragraph",
                "content": "it worked. no rate limiting, no row restrictions. i could set limit to 1000 and it just dumped everything."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "digging deeper"
            },
            {
                "type": "paragraph",
                "content": "i remembered there was a profiles table from the network requests i saw earlier. i hit that endpoint too."
            },
            {
                "type": "code",
                "language": "bash",
                "label": "profiles table",
                "content": "curl -X GET \"https://xxxxxxxx.supabase.co/rest/v1/profiles?select=*&limit=1000\" \\\n  -H \"apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\""
            },
            {
                "type": "paragraph",
                "content": "that one was interesting because it let you fetch actual information about individual users. and not just public stuff - you could use someone's username to query their anime list including the ones they marked as hidden."
            },
            {
                "type": "code",
                "language": "bash",
                "label": "hidden data query",
                "content": "curl -X GET \"https://xxxxxxxx.supabase.co/rest/v1/anime_list?select=*&username=eq.targetuser\" \\\n  -H \"apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\""
            },
            {
                "type": "paragraph",
                "content": "hidden column? didnt matter. the query returned everything regardless of the user's privacy settings. there was no policy checking whose data you were asking for."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "the scope"
            },
            {
                "type": "paragraph",
                "content": "at that point i realized how big this was. the tables were not scoped per user at all. you could iterate through user ids and pull everything. over 600 records of people's anime preferences - what they watched, what they rated, what they wanted to keep private."
            },
            {
                "type": "code",
                "language": "bash",
                "label": "iterating users",
                "content": "for id in $(seq 1 600); do\n  curl -s \"https://xxxxxxxx.supabase.co/rest/v1/profiles?select=*&id=eq.$id\" \\\n    -H \"apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\"\ndone"
            },
            {
                "type": "paragraph",
                "content": "each request came back with full profile data. no authentication needed. just the public anon key that ships with every supabase client."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "the responsible thing"
            },
            {
                "type": "paragraph",
                "content": "once i confirmed this was not just a frontend bug but an actual backend authorization problem, i stopped. i reported it to the developer with details about what i found, which endpoints were exposed, and how to fix the row level security policies. this is the kind of vulnerability that gets abused fast if the wrong person finds it first."
            },
            {
                "type": "quote",
                "content": "disclaimer: all urls, keys, usernames and data shown here have been modified to make sure nothing is identifiable. i am not naming the platform because the goal is awareness, not targeting."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "what this means"
            },
            {
                "type": "paragraph",
                "content": "supabase is great but row level security is not automatic. if you are building with supabase, double check your policies. one missing `using (auth.uid() = user_id)` and suddenly everyone can see everything."
            },
            {
                "type": "code",
                "language": "sql",
                "label": "the fix",
                "content": "-- what the policy probably should have looked like\ncreate policy \"users can only see their own anime\"\non anime_list for select\nusing (auth.uid() = user_id);"
            },
            {
                "type": "paragraph",
                "content": "always test your endpoints without authentication. if your anon key can access user data directly, you have a problem."
            }
        ]
    },
    {
        "slug": "two-months-later",
        "title": "two months later",
        "excerpt": "i reported vulnerabilities privately. two months later, users still hadn't been informed. this is what happened.",
        "author": "dsplay",
        "datePublished": 1782215280000,
        "published": true,
        "unlisted": false,
        "key": false,
        "tags": ["security"],
        "content": [
            {
                "type": "quote",
                "content": "Disclosure note: The issues described in this article were reported privately and have since been fixed. This post is intended to document the findings, the disclosure timeline, and my concerns regarding transparency."
            },
            {
                "type": "paragraph",
                "content": "i wasn't planning to write this."
            },
            {
                "type": "paragraph",
                "content": "when i originally found these issues, i reported them privately. i expected them to get fixed, users to be informed if necessary, and that to be the end of it."
            },
            {
                "type": "paragraph",
                "content": "it wasn't."
            },
            {
                "type": "paragraph",
                "content": "roughly two months passed before a public statement was released."
            },
            {
                "type": "paragraph",
                "content": "and from my perspective, the statement only appeared after repeated public pressure, discussions in the discord, and people asking why users still hadn't been informed."
            },
            {
                "type": "paragraph",
                "content": "this post is about the issues i reported, what they exposed, and why the response ended up bothering me more than the vulnerabilities themselves."
            },
            {
                "type": "paragraph",
                "content": "the platform discussed in this article is *AniDrop.lol*."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "how this started"
            },
            {
                "type": "paragraph",
                "content": "the platform was new."
            },
            {
                "type": "paragraph",
                "content": "i was doing what i normally do whenever i come across a new web app: opening devtools, watching network traffic, and seeing how things work under the hood."
            },
            {
                "type": "paragraph",
                "content": "i wasn't expecting to find much."
            },
            {
                "type": "paragraph",
                "content": "then i noticed it was using supabase."
            },
            {
                "type": "paragraph",
                "content": "that's not a problem by itself. plenty of applications use supabase. but whenever i see a supabase backend, one of the first things i check is whether row level security (RLS) has actually been configured correctly."
            },
            {
                "type": "paragraph",
                "content": "that's where things started getting interesting."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "issue #1: hidden wasn't hidden"
            },
            {
                "type": "paragraph",
                "content": "while inspecting requests, i found the supabase API being used by the frontend."
            },
            {
                "type": "paragraph",
                "content": "the public anon key was visible."
            },
            {
                "type": "paragraph",
                "content": "that's normal."
            },
            {
                "type": "paragraph",
                "content": "the anon key is supposed to be public."
            },
            {
                "type": "paragraph",
                "content": "the real protection comes from authentication and row level security policies that determine what data users are allowed to access."
            },
            {
                "type": "paragraph",
                "content": "so i started testing."
            },
            {
                "type": "paragraph",
                "content": "i copied requests into a separate client and removed authentication."
            },
            {
                "type": "paragraph",
                "content": "they still worked."
            },
            {
                "type": "paragraph",
                "content": "using only the public anon key, backend tables could be queried directly."
            },
            {
                "type": "paragraph",
                "content": "no user JWT."
            },
            {
                "type": "paragraph",
                "content": "no ownership checks."
            },
            {
                "type": "paragraph",
                "content": "no effective authorization restrictions."
            },
            {
                "type": "paragraph",
                "content": "at that point it became obvious this wasn't a frontend issue."
            },
            {
                "type": "paragraph",
                "content": "it was an authorization issue."
            },
            {
                "type": "paragraph",
                "content": "while exploring the accessible data, i noticed something particularly concerning."
            },
            {
                "type": "paragraph",
                "content": "records contained a `hidden` field."
            },
            {
                "type": "paragraph",
                "content": "and entries marked with `hidden: true` were still being returned."
            },
            {
                "type": "paragraph",
                "content": "the application clearly distinguished between visible entries and hidden entries, yet the API returned both."
            },
            {
                "type": "paragraph",
                "content": "the privacy setting existed."
            },
            {
                "type": "paragraph",
                "content": "the authorization enforcing it didn't."
            },
            {
                "type": "paragraph",
                "content": "the exposed endpoints also allowed user-related data to be enumerated at scale. profile information, watchlists, favorites, and account-associated data could be queried through the API without the restrictions that should have been in place."
            },
            {
                "type": "paragraph",
                "content": "once i confirmed the issue and understood the scope, i stopped testing and reported it."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "issue #2: email authentication failures"
            },
            {
                "type": "paragraph",
                "content": "another issue involved the platform's email configuration."
            },
            {
                "type": "paragraph",
                "content": "during testing, i noticed that the domain lacked properly configured email authentication records."
            },
            {
                "type": "paragraph",
                "content": "to verify the impact, i sent a test message claiming to originate from `admin@anidrop.lol`."
            },
            {
                "type": "paragraph",
                "content": "the message was successfully delivered despite authentication checks failing."
            },
            {
                "type": "paragraph",
                "content": "header excerpts from the delivered message showed:"
            },
            {
                "type": "code",
                "language": "text",
                "label": "authentication results",
                "content": "dkim=none\ndmarc=fail\nspf=none"
            },
            {
                "type": "paragraph",
                "content": "a redacted portion of the message headers looked like this:"
            },
            {
                "type": "code",
                "language": "text",
                "label": "message headers",
                "content": "Authentication-Results:\n    dkim=none;\n    dmarc=fail reason=\"No valid SPF, No valid DKIM\";\n    spf=none\n\nFrom: admin@anidrop.lol\nSubject: SPF Test #2 - Direct SMTP Delivery\n\nThis is a spoofed email from anidrop.lol to test SPF/DMARC.\n\nNo SPF record exists for anidrop.lol, so this email was sent directly\nto the recipient MX without authentication.\n\nIf you received this, the spoof succeeded despite DMARC p=quarantine."
            },
            {
                "type": "paragraph",
                "content": "the issue here wasn't account compromise."
            },
            {
                "type": "paragraph",
                "content": "the issue was that the domain lacked protections that help recipients verify whether messages claiming to come from the platform are legitimate."
            },
            {
                "type": "paragraph",
                "content": "that increases the risk of impersonation and phishing."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "issue #3: trusting client-controlled profile fields"
            },
            {
                "type": "paragraph",
                "content": "this one wasn't as flashy as the first issue, but it revealed a deeper design problem."
            },
            {
                "type": "paragraph",
                "content": "users could edit their profiles through a standard `PATCH` request."
            },
            {
                "type": "paragraph",
                "content": "that's expected."
            },
            {
                "type": "paragraph",
                "content": "the problem was that the backend appeared to trust far more profile fields than it should have."
            },
            {
                "type": "paragraph",
                "content": "instead of restricting updates to user-controlled fields, the endpoint accepted modifications to fields that should have been managed exclusively by the server."
            },
            {
                "type": "paragraph",
                "content": "as a result, users could modify data that directly affected how the platform treated their account."
            },
            {
                "type": "paragraph",
                "content": "examples included:"
            },
            {
                "type": "list",
                "ordered": false,
                "items": [
                    "changing profile image URLs to arbitrary external hosts",
                    "modifying fields related to verification status",
                    "altering fields used by the application to identify or associate an account"
                ]
            },
            {
                "type": "paragraph",
                "content": "one consequence of this was the ability to replace profile images with externally hosted images."
            },
            {
                "type": "paragraph",
                "content": "when another user viewed that profile, their client would fetch the image directly from the external server."
            },
            {
                "type": "paragraph",
                "content": "whoever controlled that server could then log requests made to it."
            },
            {
                "type": "paragraph",
                "content": "another consequence was that fields intended to represent account state could be modified through the same profile update mechanism."
            },
            {
                "type": "paragraph",
                "content": "the backend correctly checked who was making the request."
            },
            {
                "type": "paragraph",
                "content": "it did not sufficiently restrict what that user was allowed to change."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "security mistakes happen"
            },
            {
                "type": "paragraph",
                "content": "finding bugs isn't unusual."
            },
            {
                "type": "paragraph",
                "content": "every developer makes mistakes."
            },
            {
                "type": "paragraph",
                "content": "every platform ships vulnerabilities at some point."
            },
            {
                "type": "paragraph",
                "content": "what bothered me wasn't that vulnerabilities existed."
            },
            {
                "type": "paragraph",
                "content": "what bothered me was everything that happened afterward."
            },
            {
                "type": "paragraph",
                "content": "the issues were reported."
            },
            {
                "type": "paragraph",
                "content": "the issues were fixed."
            },
            {
                "type": "paragraph",
                "content": "but users weren't informed."
            },
            {
                "type": "paragraph",
                "content": "weeks passed."
            },
            {
                "type": "paragraph",
                "content": "then more weeks passed."
            },
            {
                "type": "paragraph",
                "content": "the vulnerabilities had existed."
            },
            {
                "type": "paragraph",
                "content": "user-associated data had been exposed."
            },
            {
                "type": "paragraph",
                "content": "records marked as hidden had been accessible."
            },
            {
                "type": "paragraph",
                "content": "yet there was no public statement."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "two months later"
            },
            {
                "type": "paragraph",
                "content": "eventually the topic came up publicly."
            },
            {
                "type": "paragraph",
                "content": "people began asking why users hadn't been informed."
            },
            {
                "type": "paragraph",
                "content": "why there had been no statement."
            },
            {
                "type": "paragraph",
                "content": "why a security issue involving user data had effectively disappeared without any public acknowledgement."
            },
            {
                "type": "paragraph",
                "content": "during these discussions, concerns about the delay were repeatedly dismissed."
            },
            {
                "type": "paragraph",
                "content": "one response that stood out to me was:"
            },
            {
                "type": "quote",
                "content": "i don't see that as a problem",
                "author": "platform owner"
            },
            {
                "type": "paragraph",
                "content": "i did."
            },
            {
                "type": "paragraph",
                "content": "and i still do."
            },
            {
                "type": "paragraph",
                "content": "whether a particular incident legally required disclosure is a question for regulators and lawyers."
            },
            {
                "type": "paragraph",
                "content": "whether users deserved transparency is a different question entirely."
            },
            {
                "type": "paragraph",
                "content": "for me, the answer to that one is obvious."
            },
            {
                "type": "paragraph",
                "content": "if user data was exposed, users should know."
            },
            {
                "type": "paragraph",
                "content": "not two months later."
            },
            {
                "type": "paragraph",
                "content": "not only after people start asking questions."
            },
            {
                "type": "paragraph",
                "content": "not only after public pressure."
            },
            {
                "type": "paragraph",
                "content": "for roughly two months, there was no public disclosure."
            },
            {
                "type": "paragraph",
                "content": "only after repeated discussion and pressure in the public discord was a statement finally released."
            },
            {
                "type": "paragraph",
                "content": "users shouldn't have to argue for transparency after a security incident."
            },
            {
                "type": "paragraph",
                "content": "it should be the default."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "aftermath"
            },
            {
                "type": "paragraph",
                "content": "around the same time a public statement finally appeared, new terms of service were introduced."
            },
            {
                "type": "paragraph",
                "content": "among other things, they included language attempting to disclaim liability for security incidents and cap liability at \u20ac0."
            },
            {
                "type": "paragraph",
                "content": "i'm not a lawyer, and i'm not going to pretend to be one."
            },
            {
                "type": "paragraph",
                "content": "what i can say is that the timing stood out."
            },
            {
                "type": "paragraph",
                "content": "the purpose of this post isn't to attack anyone."
            },
            {
                "type": "paragraph",
                "content": "it's to document what happened, what was reported, and why transparency matters just as much as fixing the bug itself."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "ending"
            },
            {
                "type": "paragraph",
                "content": "despite everything in this post, i don't consider the owner a bad person."
            },
            {
                "type": "paragraph",
                "content": "i've enjoyed being part of the community and talking with many of the people involved."
            },
            {
                "type": "paragraph",
                "content": "my criticism is directed at the decisions that were made, not at the person behind them."
            },
            {
                "type": "paragraph",
                "content": "i believe this situation showed a lack of experience in handling security incidents and communicating with users."
            },
            {
                "type": "paragraph",
                "content": "hopefully that's something that improves with time."
            },
            {
                "type": "paragraph",
                "content": "platforms earn trust slowly and lose it quickly. how problems are handled often matters just as much as the problems themselves."
            },
            {
                "type": "paragraph",
                "content": "because in the end, the vulnerabilities were patched."
            },
            {
                "type": "quote",
                "content": "good security isn't defined by never making mistakes. it's defined by how you respond when you do.",
                "author": "dsplay"
            },
            {
                "type": "divider"
            },
            {
                "type": "paragraph",
                "content": "i also want to acknowledge my own mistakes."
            },
            {
                "type": "paragraph",
                "content": "if my attitude or reactions during discussions were driven by frustration rather than logic, i apologize for that."
            }
        ]
    },
    {
        "slug": "the-true-love-paradox",
        "title": "The True Love Paradox",
        "excerpt": "Love is something that people choose to do. The True Love Paradox asks if a person can really love someone if they do things on purpose to make that person love them back.",
        "thumbnail": "https://r2.dsplay.cc/trueloveparadox.png",
        "author": "dsplay",
        "datePublished": 1783078017000,
        "published": true,
        "unlisted": false,
        "key": false,
        "tags": ["philosophy", "ethics"],
        "content": [
            {
                "type": "heading",
                "level": 2,
                "content": "Abstract"
            },
            {
                "type": "paragraph",
                "content": "Love is often described as one of the freest choices a person can make. People admire love because it is given willingly rather than demanded or forced. This blog introduces a thought experiment called the True Love Paradox, which asks whether a person can truly claim to love someone if they intentionally manipulate that person into loving them back. The paradox becomes even more difficult when the other person sincerely believes that their love was freely chosen. This blog explores the relationship between love, autonomy, manipulation, and free choice. It argues that the ethical issue is not whether the resulting emotions are real, but whether intentionally shaping another person's romantic choice is compatible with genuine love."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "Introduction"
            },
            {
                "type": "paragraph",
                "content": "Romantic love has long been connected to freedom. Unlike obligations such as family responsibilities or legal duties, love is generally seen as meaningful because people choose it. A person cannot be ordered to genuinely love someone in the same way they can be ordered to complete a task. While they can pretend, the emotional value of love depends on it being freely given."
            },
            {
                "type": "paragraph",
                "content": "This idea leads to an interesting philosophical question. Suppose a person possesses the ability to guarantee that someone will fall in love with them. They decide to use this ability on the person they genuinely love. The other person does not feel controlled. They honestly believe they chose the relationship on their own. Their emotions are sincere, and they experience happiness."
            },
            {
                "type": "paragraph",
                "content": "Can this relationship still be considered true love?"
            },
            {
                "type": "paragraph",
                "content": "At first, the answer may seem obvious. If both people are happy and the love feels authentic, perhaps nothing is wrong. However, the person who used the ability knows that the relationship exists because of their own intervention. This creates a conflict between achieving love and respecting another person's freedom."
            },
            {
                "type": "paragraph",
                "content": "This conflict is what I call the True Love Paradox."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "Defining the Paradox"
            },
            {
                "type": "paragraph",
                "content": "The paradox can be expressed with three ideas."
            },
            {
                "type": "paragraph",
                "content": "First, many philosophical views argue that love gains its value because it is freely chosen."
            },
            {
                "type": "paragraph",
                "content": "Second, intentionally causing another person to love you interferes with the process through which that choice is made."
            },
            {
                "type": "paragraph",
                "content": "Finally, if the resulting love feels completely genuine to the other person, dismissing it as completely false also seems unsatisfying."
            },
            {
                "type": "paragraph",
                "content": "These ideas create a contradiction. If love requires freedom, manipulation appears to destroy what makes love meaningful. Yet if the resulting emotions are sincere, calling the relationship entirely fake also feels incorrect."
            },
            {
                "type": "paragraph",
                "content": "The paradox therefore asks whether genuine emotions are enough, or whether the process that produced those emotions also matters."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "A Thought Experiment"
            },
            {
                "type": "paragraph",
                "content": "Imagine that a person has the ability to make another individual truly fall in love with them."
            },
            {
                "type": "paragraph",
                "content": "The affected person is not aware of any manipulation. They sincerely believe they chose the relationship. Their affection is real from their own perspective. They are not pretending or acting."
            },
            {
                "type": "paragraph",
                "content": "Only one person knows the truth."
            },
            {
                "type": "paragraph",
                "content": "The person who initiated the change understands that without their intervention, the relationship may never have existed."
            },
            {
                "type": "paragraph",
                "content": "Even if the relationship becomes healthy and loving, one question remains."
            },
            {
                "type": "paragraph",
                "content": "Was this person ever truly free to choose?"
            },
            {
                "type": "paragraph",
                "content": "This uncertainty is what gives the paradox its force."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "The Ethical Question"
            },
            {
                "type": "paragraph",
                "content": "Many discussions about manipulation focus on the person being manipulated. The True Love Paradox instead focuses on the morality of the person who initiates the manipulation."
            },
            {
                "type": "paragraph",
                "content": "If I truly love someone, should I respect their ability to decide whether they love me?"
            },
            {
                "type": "paragraph",
                "content": "If I remove or intentionally influence that ability for my own happiness, am I acting out of love, or am I acting out of selfish desire?"
            },
            {
                "type": "paragraph",
                "content": "This question changes the discussion. It is no longer about whether the other person's emotions are real. Instead, it asks whether genuine love can exist alongside an intentional violation of another person's autonomy."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "A Real World Version"
            },
            {
                "type": "paragraph",
                "content": "The supernatural example is only a thought experiment."
            },
            {
                "type": "paragraph",
                "content": "In reality, people sometimes attempt to influence romantic feelings through emotional manipulation, guilt, deception, or psychological techniques designed to increase attraction."
            },
            {
                "type": "paragraph",
                "content": "Unlike magic, these methods do not guarantee love. The other person still makes a decision. However, their decision may be shaped by circumstances intentionally created by someone else."
            },
            {
                "type": "paragraph",
                "content": "This raises another question."
            },
            {
                "type": "paragraph",
                "content": "If a person chooses to love someone after being manipulated, is that love truly their own choice?"
            },
            {
                "type": "paragraph",
                "content": "The answer is not simple because every relationship involves some degree of influence."
            },
            {
                "type": "paragraph",
                "content": "People naturally become more attractive by being kind, honest, funny, or emotionally supportive. These forms of influence generally respect another person's freedom because rejection remains a real possibility."
            },
            {
                "type": "paragraph",
                "content": "Manipulation is different because its purpose is to reduce that freedom by steering another person's emotions toward a desired outcome."
            },
            {
                "type": "paragraph",
                "content": "The ethical difference is therefore not influence itself, but the intention to interfere with autonomous decision making."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "The Apology Analogy"
            },
            {
                "type": "paragraph",
                "content": "A useful comparison can be made with apologies."
            },
            {
                "type": "paragraph",
                "content": "Imagine a student who is forced by a teacher to apologize."
            },
            {
                "type": "paragraph",
                "content": "The student says the words, but most people would not consider the apology fully sincere because it was required."
            },
            {
                "type": "paragraph",
                "content": "Now imagine another student who reflects on their mistake and apologizes voluntarily."
            },
            {
                "type": "paragraph",
                "content": "The words may be identical, but the second apology carries greater moral value because it was freely chosen."
            },
            {
                "type": "paragraph",
                "content": "Love may be more complicated than an apology, but the comparison highlights an important point."
            },
            {
                "type": "paragraph",
                "content": "Freedom contributes to authenticity."
            },
            {
                "type": "paragraph",
                "content": "If this is true for apologies, it may also be true for love."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "Objections"
            },
            {
                "type": "paragraph",
                "content": "One possible objection is that all human choices are influenced by outside factors. Personality, upbringing, biology, culture, and previous experiences all shape the people we become."
            },
            {
                "type": "paragraph",
                "content": "If every decision is influenced, why should romantic influence be treated differently?"
            },
            {
                "type": "paragraph",
                "content": "The answer may lie in intention."
            },
            {
                "type": "paragraph",
                "content": "Natural influences exist without any single person controlling them for personal benefit."
            },
            {
                "type": "paragraph",
                "content": "Manipulation, however, involves intentionally shaping another person's emotions in order to produce a specific romantic outcome."
            },
            {
                "type": "paragraph",
                "content": "The concern is therefore not that influence exists, but that one individual deliberately creates it for their own desires."
            },
            {
                "type": "paragraph",
                "content": "Another objection is that if the other person sincerely feels love, then the relationship should still be considered genuine."
            },
            {
                "type": "paragraph",
                "content": "This is one of the strongest challenges to the paradox."
            },
            {
                "type": "paragraph",
                "content": "Perhaps genuine emotional experience is enough."
            },
            {
                "type": "paragraph",
                "content": "On the other hand, one might argue that genuine emotions can still originate from an ethically questionable process."
            },
            {
                "type": "paragraph",
                "content": "The paradox does not resolve this disagreement. Instead, it asks whether both emotional authenticity and personal autonomy are necessary for true love."
            },
            {
                "type": "heading",
                "level": 2,
                "content": "Conclusion"
            },
            {
                "type": "paragraph",
                "content": "The True Love Paradox explores a conflict between two powerful human values."
            },
            {
                "type": "paragraph",
                "content": "People desire to be loved, yet they also recognize the importance of respecting another person's freedom."
            },
            {
                "type": "paragraph",
                "content": "If love is meaningful because it is freely chosen, then intentionally creating another person's love appears to contradict the very idea of genuine love."
            },
            {
                "type": "paragraph",
                "content": "At the same time, if the resulting emotions are sincere, dismissing them as entirely meaningless also seems incomplete."
            },
            {
                "type": "paragraph",
                "content": "Rather than offering a final answer, the True Love Paradox invites further discussion about love, manipulation, and autonomy."
            },
            {
                "type": "paragraph",
                "content": "Ultimately, the paradox asks a simple but difficult question."
            },
            {
                "type": "quote",
                "content": "If another person's love depends on your deliberate intervention, did they truly choose you, or did you choose for them?"
            }
        ]
    }
];