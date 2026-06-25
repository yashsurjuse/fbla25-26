import json
import random

with open("src/data/press_releases.json", "r", encoding="utf-8") as f:
    prs = json.load(f)

paragraphs_pool = [
    "The Metropolitan Museum of Art announced today a transformative initiative that will redefine its engagement with both local communities and international scholars. This comprehensive program, developed over two years of intensive planning, aims to increase public access to our core collections while simultaneously launching an unprecedented series of scholarly symposia.",
    "Central to this initiative is the complete renovation of several key galleries. These spaces have been entirely reimagined to allow for greater natural light and more fluid visitor circulation. Furthermore, state-of-the-art climate control systems have been installed, ensuring the long-term preservation of our most delicate artifacts.",
    "In conjunction with the physical renovations, the Museum is launching a robust digital platform. This new online hub will feature interactive 3D models of select sculptures, high-definition panoramic tours of the new galleries, and an expansive archive of curatorial notes previously unavailable to the general public.",
    "This endeavor has been made possible through the extraordinary generosity of our philanthropic partners. Their visionary support underscores a shared commitment to safeguarding our cultural heritage and ensuring that the Museum remains a vibrant center for education and inspiration for generations to come.",
    "A key component of the upcoming season will be a series of community outreach programs designed specifically for K-12 students across the five boroughs. These programs will provide free transportation, specialized guided tours, and hands-on workshops led by working artists and museum educators.",
    "The curatorial team has spent the past eighteen months scouring archives and negotiating loans with institutions across Europe and Asia to assemble this unprecedented collection. Many of these works have never before been seen in the United States, offering a once-in-a-lifetime opportunity for our visitors.",
    "The Museum's conservation department also played a pivotal role in preparing for this announcement. Several major works underwent extensive cleaning and structural stabilization. Notably, a team of five conservators spent over a thousand hours restoring a monumental altarpiece that will serve as the centerpiece of the new installation.",
    "To accompany the new exhibitions, the Museum's publishing imprint will release a fully illustrated, 400-page catalogue. Featuring essays by leading international scholars, this publication promises to become the definitive reference work on the subject, offering fresh perspectives and challenging long-held assumptions.",
    "We invite everyone to join us for the opening weekend festivities, which will include live performances, curatorial talks, and extended evening hours. Admission will be free for all visitors during this inaugural weekend, ensuring that this momentous occasion is accessible to all members of our community."
]

for pr in prs:
    # Generate unique content for each PR
    num_paras = random.randint(4, 6)
    chosen_paras = random.sample(paragraphs_pool, num_paras)
    
    # Prepend a specific introductory paragraph related to the title
    intro = f"NEW YORK—The Metropolitan Museum of Art today shared further details regarding '{pr['title']}'. This announcement marks a significant milestone in the Museum's ongoing commitment to excellence in exhibition, conservation, and public education. The leadership team expressed profound gratitude to the patrons and staff who brought this vision to fruition."
    
    pr["content"] = [intro] + chosen_paras

with open("src/data/press_releases.json", "w", encoding="utf-8") as f:
    json.dump(prs, f, indent=2)

print("Press releases updated with unique content.")
