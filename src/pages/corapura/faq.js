import PageLayoutCorapura from '@/components/Layouts/pageLayoutCorapura'
import { Faq } from '@/components/corapura'
import Container from '@/components/corapura/Layout/container'
import { faqCorapura } from '@/lib/corapura/constants'

const CorapuraFaq = () => {
    return (
        <section className="cont1">
            <Container small900>
                <Faq faqs={faqCorapura} kasou />
            </Container>
        </section>
    )
}

export default CorapuraFaq

CorapuraFaq.getLayout = function getLayout(page) {
    return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}
