import { useSupportChat } from '../hooks/useSupportChat'
import SupportHero from '../components/support/SupportHero'
import SupportChatInterface from '../components/support/SupportChatInterface'
import SupportFaqAndGuides from '../components/support/SupportFaqAndGuides'
import CTA from '../components/CTA'

function Support() {
  const {
    userConversation,
    isBotTyping,
    sendUserMessage,
    requestLiveAgent,
    startNewSession,
  } = useSupportChat()

  const handleSelectQuestion = (question) => {
    sendUserMessage(question)
    window.scrollTo({ top: 350, behavior: 'smooth' })
  }

  return (
    <main className="home-page-shell min-h-screen text-white">
      {/* 1. Client Support Hero with SLAs and 24/7 Status */}
      <SupportHero />

      {/* 2. Client Interactive Live Chat Interface */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <SupportChatInterface
              conversation={userConversation}
              onSendMessage={sendUserMessage}
              onRequestLiveAgent={requestLiveAgent}
              onResetSession={startNewSession}
              isBotTyping={isBotTyping}
            />
          </div>
        </div>
      </section>

      {/* 3. Knowledge Base & Quick FAQ Category Guides */}
      <SupportFaqAndGuides onSelectQuestion={handleSelectQuestion} />

      {/* 4. Final Conversion Call To Action */}
      <CTA />
    </main>
  )
}

export default Support
