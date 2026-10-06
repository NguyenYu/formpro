import PinkFluidBackground from '@/components/pink-fluid-background'
import { AppHeader } from '@/components/app-header'
import DiscussionForum from '@/components/discussion-forum'

export default function HomePage() {
  return (
    <>
      <PinkFluidBackground />
      <AppHeader />
      <main>
        <DiscussionForum />
      </main>
    </>
  )
}
