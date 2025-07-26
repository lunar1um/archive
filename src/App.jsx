import { useState, useEffect } from "react";
import { ThemeToggler } from "./components/ThemeToggler";
import { MusicToggler } from "./components/MusicToggler";
import { Title } from "./components/Title";
import { DraggableWindow } from "./components/DraggableWindow";
import { Card } from "./components/Card";
import { Window } from "./components/Window";
import { Contact } from "./components/Contact";
import ReactMarkdown from "react-markdown";
import { ShootingStar } from "./components/ShootingStar";
import { Starfield } from "./components/Starfield";
import remarkGfm from "remark-gfm";

const MarkdownWindow = ({ path }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(path)
      .then((res) => res.text())
      .then(setContent)
      .catch(() => setContent("failed to load content"));
  }, [path]);

  return (
    <div className="prose dark:prose-invert max-w-full">
      <ReactMarkdown
        children={content}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-lg lg:text-xl font-bold mb-4" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2
              className="text-[17px] lg:text-lg font-semibold mb-3"
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              className="text-base lg:text-[17px] font-medium mb-2"
              {...props}
            />
          ),
          a: ({ ...props }) => (
            <a className="text-blue-400 underline" target="_blank" {...props} />
          ),
          p: ({ ...props }) => (
            <p
              className="mb-2 text-sm lg:text-base text-gray-800 dark:text-gray-300"
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <ul
              className="list-disc ml-6 mb-2 text-sm lg:text-base text-gray-800 dark:text-gray-300"
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <ol
              className="list-decimal ml-6 mb-2 text-sm lg:text-base text-gray-800 dark:text-gray-300"
              {...props}
            />
          ),
          li: ({ ...props }) => (
            <li
              className="mb-1 text-sm lg:text-base text-gray-800 dark:text-gray-300"
              {...props}
            />
          ),
        }}
        remarkPlugins={[remarkGfm]}
      />
    </div>
  );
};

const cardData = [
  {
    id: 1,
    title: "profile.md",
    desc: "who i am. specs, quirks, and core data.",
    icon: "person",
  },
  {
    id: 2,
    title: "works/",
    desc: "stuffs i've built, broken, or shipped.",
    icon: "folder",
  },
  {
    id: 3,
    title: "journalctl",
    desc: "raw thoughts, brain dump and ideas.",
    icon: "note",
  },
  {
    id: 4,
    title: "quotes.sys",
    desc: "saved words that sound like me.",
    icon: "cloud",
  },
  {
    id: 5,
    title: "contacts.cfg",
    desc: "ways to reach me. ports open.",
    icon: "chain",
  },
];

export default function App() {
  const [windows, setWindows] = useState([]);
  const [zCounter, setZCounter] = useState(1);
  const [titleDone, setTitleDone] = useState(false);
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    if (titleDone) {
      const interval = setInterval(() => {
        setVisibleCards((prev) => {
          if (prev < cardData.length) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 150); // delay between each card appearance

      return () => clearInterval(interval);
    }
  }, [titleDone]);

  const openWindow = (card) => {
    const exists = windows.find((w) => w.id === card.id);
    if (exists) return bringToFront(card.id);

    let content;

    switch (card.title) {
      case "contacts.cfg":
        content = (
          <div className="p-4 flex-1 overflow-auto grid grid-cols-2 lg:grid-cols-5 gap-4 text-center text-md text-gray-800 dark:text-gray-200">
            <Contact
              link="https://x.com/lunar1um"
              title="bro really thought could make me call it 'X'"
              icon="twitter"
              name="Twitter"
            />

            <Contact
              link="mailto:lunar1um@proton.me"
              icon="email"
              name="Email"
            />

            <Contact
              link="https://open.spotify.com/user/317lys4ze7qfx73wmeki6lvuamia"
              icon="spotify"
              name="Spotify"
            />

            <Contact
              link="https://discordapp.com/users/451335202342436866"
              icon="discord"
              name="Discord"
            />

            <Contact
              link="https://www.roblox.com/users/342032186/profile"
              icon="roblox"
              name="Roblox"
            />

            <Contact
              link="https://www.youtube.com/@lunar1997"
              icon="youtube"
              name="Youtube"
            />

            <Contact
              link="https://www.github.com/lunar1um"
              icon="github"
              name="Github"
            />

            <Contact
              link="https://www.reddit.com/u/Lunar199/s/9z0r10maAc"
              icon="reddit"
              name="Reddit"
            />

            <Contact
              link="https://www.notion.so/1bda666f29858069abf8d8562732c6f6?v=1bda666f29858061a920000cec706539&source=copy_link"
              icon="watchlist"
              name="Watchlist"
            />

            <Contact link="about:blank" icon="blank" name="Blank" />
          </div>
        );
        break;
      default:
        content = (
          <MarkdownWindow path={`/md/${card.title.replace("/", "")}.md`} />
        );
    }

    setWindows((prev) => [
      ...prev,
      {
        ...card,
        z: zCounter,
        position: {
          x: 100 + prev.length * 20,
          y: 100 + prev.length * 20,
        },
        content,
        closing: false,
      },
    ]);

    setZCounter((z) => z + 1);
  };

  const bringToFront = (id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, z: zCounter } : w)),
    );
    setZCounter((z) => z + 1);
  };

  const closeWindow = (id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, closing: true } : w)),
    );

    setTimeout(() => {
      setWindows((prev) => prev.filter((w) => w.id !== id));
    }, 200);
  };

  const updatePosition = (id, position) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w)),
    );
  };

  return (
    <div className="min-h-screen max-h-screen bg-gradient-to-br from-purple-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 font-jetbrains-mono transition px-4 py-10 relative overflow-hidden">
      <Starfield count={150} />

      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 800 800"
        preserveAspectRatio="none"
      >
        <ShootingStar />
      </svg>

      <ThemeToggler />
      <MusicToggler />

      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-md space-y-4">
          <Title onDone={() => setTitleDone(true)} />

          {cardData.slice(0, visibleCards).map((card) => (
            <div
              key={card.id}
              className={`
                transition-all duration-1000 ease-out
                opacity-100 translate-y-4
              `}
            >
              <Card
                title={card.title}
                desc={card.desc}
                icon={card.icon}
                onClick={() => openWindow(card)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="fixed inset-0 z-5 pointer-events-none">
        <div className="relative w-full h-full">
          {windows.map((win) => {
            const isMobile = window.innerWidth < 1024;

            return isMobile ? (
              <Window
                key={win.id}
                title={win.title}
                onClose={() => closeWindow(win.id)}
              >
                {win.content}
              </Window>
            ) : (
              <DraggableWindow
                key={win.id}
                win={win}
                onClose={() => closeWindow(win.id)}
                onDragStart={() => bringToFront(win.id)}
                onDragStop={(pos) => updatePosition(win.id, pos)}
                closing={win.closing}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
