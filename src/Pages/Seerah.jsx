import React, { useEffect, useRef, useState } from 'react';

function Seerah() {
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const card5Ref = useRef(null);
  const card6Ref = useRef(null);

  const [visible, setVisible] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false,
    card5: false,
    card6: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = { ...prev };
          entries.forEach((entry) => {
            const key = entry.target.getAttribute('data-key');
            next[key] = entry.isIntersecting; // toggle visibility
          });
          return next;
        });
      },
      { threshold: 0.25 }
    );

    [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref, card6Ref].forEach(
      (ref) => ref.current && observer.observe(ref.current)
    );

    return () => observer.disconnect();
  }, []);

  const pdfUrls = {
    card1: '/pdfs/life ofP.pdf',
    card2: '/pdfs/DFF.pdf',
    card3: '/pdfs/TelephoneUs.pdf',
    card4: '/pdfs/Men,WomenATM.pdf',
    card5: '/pdfs/RiyadSaliheen.pdf',
    card6: '/pdfs/FiqhMEasy.pdf',
  };

  const renderCard = (ref, key, title, description, fileName, direction) => {
    let hiddenClass =
      direction === 'left'
        ? 'translate-x-32 opacity-0'
        : '-translate-x-32 opacity-0';

    return (
      <div
        ref={ref}
        data-key={key}
        className={`bg-white rounded-2xl hover:scale-105 duration-700 p-7 flex flex-col justify-between h-full min-h-[200px]
          transform transition-all ease-out will-change-transform
          ${visible[key] ? 'translate-x-0 translate-y-0 opacity-100' : hiddenClass}`}
      >
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="tracking-wide text-[#101828] mt-2">{description}</p>
        </div>
        <div className="flex gap-4 mt-6">
          <a
            href={pdfUrls[key]}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1062f2] hover:bg-[#1447E6] duration-700 text-white py-2 px-4 rounded-sm"
          >
            View
          </a>
          <a
            href={pdfUrls[key]}
            download={fileName}
            className="bg-[#069766] hover:bg-[#007A55] duration-700 py-2 px-5 text-white rounded-sm"
          >
            Download
          </a>
        </div>
      </div>
    );
  };

  return (
    <section>
      <div className="bg-[#666666] pt-40 pb-30 overflow-x-hidden">
        <div className="mb-10 px-4">
          <h1 className="text-white text-4xl font-bold text-center">
            The Seerah of the Prophet ﷺ and other beneficial books.
          </h1>
        </div>

        <div className="grid gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3 w-[99%] m-auto">
          {renderCard(
            card1Ref,
            'card1',
            'The Life of the Prophet Muhammad ﷺ',
            'An overview of the noble life of the Final Messenger.',
            'life ofP.pdf',
            'left'
          )}
          {renderCard(
            card2Ref,
            'card2',
            'Fitnah of Fame',
            'A thought-provoking reminder on the dangers of seeking fame and recognition, and how it can affect sincerity and faith.',
            'DFF.pdf',
            'left'
          )}
          {renderCard(
            card3Ref,
            'card3',
            'The Islamic Etiquette of Using the Telephone',
            'A guide to using the telephone with proper Islamic manners, preserving respect, privacy, and adab in communication.',
            'TelephoneUs.pdf',
            'left'
          )}
          {renderCard(
            card4Ref,
            'card4',
            'Men and Women Around the Messenger ﷺ',
            'Inspiring stories of men and women who closely accompanied the Prophet ﷺ, highlighting their character, faith, and legacy.',
            'Men_and_Women_Around_the_Messenger.pdf',
            'top'
          )}
          {renderCard(
            card5Ref,
            'card5',
            'Riyadus-Salihin',
            'A timeless collection of authentic hadiths guiding Muslims on righteous conduct, worship, and moral excellence.',
            'RiyadSaliheen.pdf',
            'top'
          )}
          {renderCard(
            card6Ref,
            'card6',
            'Fiqh Made Easy',
            'A simplified guide to essential Islamic rulings on worship, transactions, and daily life, made easy for every Muslim to understand.',
            'FiqhMEasy.pdf',
            'top'
          )}
        </div>
      </div>
    </section>
  );
}

export default Seerah;
