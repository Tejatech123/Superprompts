"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { AuthHeader } from "@/components/auth-header";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";

interface TimelineSegment {
  time: string;
  location?: string;
  lighting?: string;
  camera?: string;
  environment?: string;
  vibe?: string;
  dialogue?: string;
  effect?: string;
}

interface AdPrompt {
  brand: string;
  meta: {
    created_at: string;
    video_style: string;
    duration: string;
    mood: string;
    camera_type: string;
  };
  timeline: TimelineSegment[];
  note: string;
}

const productAds: AdPrompt[] = [
  {
    brand: "Colgate",
    meta: {
      created_at: "2025-10-19T12:36:09.838089Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Colgate se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Colgate - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Colgate, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Sprite",
    meta: {
      created_at: "2025-10-19T12:36:09.838106Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Sprite se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Sprite - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Sprite, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Red Bull",
    meta: {
      created_at: "2025-10-19T12:36:09.838111Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Red Bull se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Red Bull - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Red Bull, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Mentos",
    meta: {
      created_at: "2025-10-19T12:36:09.838115Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Mentos se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Mentos - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Mentos, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "OnePlus",
    meta: {
      created_at: "2025-10-19T12:36:09.838118Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:OnePlus se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:OnePlus - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for OnePlus, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Tata Motors",
    meta: {
      created_at: "2025-10-19T12:36:09.838122Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Tata Motors se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Tata Motors - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Tata Motors, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Amul",
    meta: {
      created_at: "2025-10-19T12:36:09.838126Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Amul se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Amul - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Amul, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Himalaya Men",
    meta: {
      created_at: "2025-10-19T12:36:09.838131Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Himalaya Men se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Himalaya Men - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Himalaya Men, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Boat Earbuds",
    meta: {
      created_at: "2025-10-19T12:36:09.838136Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Boat Earbuds se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Boat Earbuds - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Boat Earbuds, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Lays Chips",
    meta: {
      created_at: "2025-10-19T12:36:09.838142Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Lays Chips se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Lays Chips - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Lays Chips, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Nescafe",
    meta: {
      created_at: "2025-10-19T12:36:09.838149Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Nescafe se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Nescafe - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Nescafe, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Surf Excel",
    meta: {
      created_at: "2025-10-19T12:36:09.838155Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Surf Excel se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Surf Excel - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Surf Excel, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Raymond",
    meta: {
      created_at: "2025-10-19T12:36:09.838161Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Raymond se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Raymond - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Raymond, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Maggi",
    meta: {
      created_at: "2025-10-19T12:36:09.838167Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Maggi se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Maggi - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Maggi, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Tanishq",
    meta: {
      created_at: "2025-10-19T12:36:09.838173Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Tanishq se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Tanishq - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Tanishq, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Oppo",
    meta: {
      created_at: "2025-10-19T12:36:09.838177Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Oppo se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Oppo - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Oppo, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Zomato",
    meta: {
      created_at: "2025-10-19T12:36:09.838181Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Zomato se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Zomato - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Zomato, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Bisleri",
    meta: {
      created_at: "2025-10-19T12:36:09.838187Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Bisleri se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Bisleri - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Bisleri, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Nike India",
    meta: {
      created_at: "2025-10-19T12:36:09.838193Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Nike India se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Nike India - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Nike India, emphasizing realism, emotional connection, and visual polish."
  },
  {
    brand: "Tata Tea",
    meta: {
      created_at: "2025-10-19T12:36:09.838199Z",
      video_style: "Cinematic realism / Product ad",
      duration: "8s",
      mood: "Energetic / Inspirational / Realistic",
      camera_type: "Veo 3.1 cinematic diffusion"
    },
    timeline: [
      {
        time: "0.0-2.0s",
        location: "Realistic Indian setting matching brand aesthetic (urban street, home, office, or outdoors).",
        lighting: "Natural light or cinematic tone suitable for product mood.",
        camera: "Wide establishing shot revealing product and user naturally.",
        environment: "Subtle ambient sounds - traffic, wind, or crowd noise.",
        vibe: "Everyday realism with emotional undertone."
      },
      {
        time: "2.0-4.0s",
        camera: "Smooth dolly-in or handheld close-up of product in use.",
        dialogue: "[translate:Tata Tea se din ki shuruaat karo]",
        lighting: "Soft balanced tones emphasizing product texture.",
        effect: "Shallow depth of field, natural bokeh highlights.",
        environment: "Foley of object interaction (pour, crunch, sip, etc.)."
      },
      {
        time: "4.0-6.0s",
        camera: "Medium shot showing genuine human reaction - smile, focus, confidence.",
        dialogue: "[translate:Bas yahi toh feel hai]",
        lighting: "Directional fill light enhancing facial emotion.",
        environment: "Music swell matching the brand's vibe.",
        vibe: "Relatable emotion - satisfaction or inspiration."
      },
      {
        time: "6.0-8.0s",
        camera: "Close-up hero shot of product with logo clearly visible.",
        dialogue: "[translate:Tata Tea - ab har din special banao]",
        lighting: "Highlight and glow on brand logo.",
        environment: "Clean brand sting ending tone.",
        vibe: "Confident brand finish."
      }
    ],
    note: "A crisp cinematic ad structure for Tata Tea, emphasizing realism, emotional connection, and visual polish."
  }
];

export default function ProductAdsPage() {
  const { toast } = useToast();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [expandedAds, setExpandedAds] = useState<Set<string>>(new Set());

  const formatPromptForCopy = (ad: AdPrompt): string => {
    // Create a clean timeline without undefined fields
    const cleanTimeline = ad.timeline.map(segment => {
      const cleaned: any = { time: segment.time };
      if (segment.location) cleaned.location = segment.location;
      if (segment.lighting) cleaned.lighting = segment.lighting;
      if (segment.camera) cleaned.camera = segment.camera;
      if (segment.dialogue) cleaned.dialogue = segment.dialogue;
      if (segment.effect) cleaned.effect = segment.effect;
      if (segment.environment) cleaned.environment = segment.environment;
      if (segment.vibe) cleaned.vibe = segment.vibe;
      return cleaned;
    });

    const promptData = {
      meta: {
        created_at: ad.meta.created_at,
        video_style: ad.meta.video_style,
        duration: ad.meta.duration,
        mood: ad.meta.mood,
        camera_type: ad.meta.camera_type
      },
      timeline: cleanTimeline
    };

    return JSON.stringify(promptData, null, 0).replace(/\n/g, ' ');
  };

  const copyPrompt = async (ad: AdPrompt, key: string) => {
    const prompt = formatPromptForCopy(ad);
    const markCopied = () => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    };

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(prompt);
        markCopied();
        toast({
          title: "Copied!",
          description: `${ad.brand} ad prompt copied to clipboard`,
        });
        return;
      }
    } catch {}

    try {
      const textarea = document.createElement("textarea");
      textarea.value = prompt;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "-9999px";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (successful) {
        markCopied();
        toast({
          title: "Copied!",
          description: `${ad.brand} ad prompt copied to clipboard`,
        });
        return;
      }
      throw new Error("execCommand copy failed");
    } catch (e: any) {
      toast({
        title: "Copy failed",
        description: e?.message ?? "Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleExpanded = (brand: string) => {
    const newExpanded = new Set(expandedAds);
    if (newExpanded.has(brand)) {
      newExpanded.delete(brand);
    } else {
      newExpanded.add(brand);
    }
    setExpandedAds(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <AuthHeader />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Veo 3 Prompts
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional cinematic ad prompts for stunning 8-second product commercials using Veo 3.1 diffusion
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Badge variant="default" className="text-base px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600">
              20 Brand Templates
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            <Badge variant="secondary" className="text-sm">8s Duration</Badge>
            <Badge variant="secondary" className="text-sm">Cinematic Realism</Badge>
            <Badge variant="secondary" className="text-sm">Veo 3.1</Badge>
            <Badge variant="secondary" className="text-sm">Indian Context</Badge>
          </div>
        </div>

        {/* Product Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productAds.map((ad) => {
            const isExpanded = expandedAds.has(ad.brand);
            const isCopied = copiedKey === ad.brand;

            return (
              <Card key={ad.brand} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl font-bold">{ad.brand}</CardTitle>
                      <CardDescription>{ad.meta.video_style}</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyPrompt(ad, ad.brand)}
                      className="shrink-0"
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline">{ad.meta.duration}</Badge>
                    <Badge variant="outline">{ad.meta.mood.split(' / ')[0]}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Meta Info */}
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Camera:</span>
                      <span className="font-medium">{ad.meta.camera_type}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Mood:</span>
                      <span className="font-medium text-xs">{ad.meta.mood}</span>
                    </div>
                  </div>

                  {/* Timeline Preview (First segment always shown) */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Timeline
                    </h4>
                    
                    {/* First Timeline Segment */}
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-purple-500">{ad.timeline[0].time}</Badge>
                        <span className="text-xs text-muted-foreground">Opening Shot</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        {ad.timeline[0].camera && (
                          <div>
                            <span className="font-medium">Camera:</span>{" "}
                            <span className="text-muted-foreground">{ad.timeline[0].camera}</span>
                          </div>
                        )}
                        {ad.timeline[0].vibe && (
                          <div>
                            <span className="font-medium">Vibe:</span>{" "}
                            <span className="text-muted-foreground">{ad.timeline[0].vibe}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expandable Full Timeline */}
                    {isExpanded && (
                      <div className="space-y-3 animate-in slide-in-from-top duration-300">
                        {ad.timeline.slice(1).map((segment, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg p-4 border border-blue-500/20"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-blue-500">{segment.time}</Badge>
                              {segment.dialogue && (
                                <span className="text-xs text-muted-foreground">With Dialogue</span>
                              )}
                            </div>
                            <div className="space-y-2 text-sm">
                              {segment.camera && (
                                <div>
                                  <span className="font-medium">Camera:</span>{" "}
                                  <span className="text-muted-foreground">{segment.camera}</span>
                                </div>
                              )}
                              {segment.dialogue && (
                                <div>
                                  <span className="font-medium">Dialogue:</span>{" "}
                                  <span className="text-muted-foreground italic">{segment.dialogue}</span>
                                </div>
                              )}
                              {segment.lighting && (
                                <div>
                                  <span className="font-medium">Lighting:</span>{" "}
                                  <span className="text-muted-foreground">{segment.lighting}</span>
                                </div>
                              )}
                              {segment.effect && (
                                <div>
                                  <span className="font-medium">Effect:</span>{" "}
                                  <span className="text-muted-foreground">{segment.effect}</span>
                                </div>
                              )}
                              {segment.environment && (
                                <div>
                                  <span className="font-medium">Environment:</span>{" "}
                                  <span className="text-muted-foreground">{segment.environment}</span>
                                </div>
                              )}
                              {segment.vibe && (
                                <div>
                                  <span className="font-medium">Vibe:</span>{" "}
                                  <span className="text-muted-foreground">{segment.vibe}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Expand/Collapse Button */}
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => toggleExpanded(ad.brand)}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="mr-2 h-4 w-4" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-2 h-4 w-4" />
                        View Full Timeline ({ad.timeline.length} segments)
                      </>
                    )}
                  </Button>

                  {/* Note */}
                  <div className="bg-muted/30 rounded-lg p-3 border-l-4 border-purple-500">
                    <p className="text-sm text-muted-foreground italic">{ad.note}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-4">About These Prompts</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              These cinematic ad prompts are specifically designed for creating professional product commercials
              using Veo 3.1 cinematic diffusion technology.
            </p>
            <p>
              Each ad follows a 4-stage structure:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Establishing Shot (0-2s):</strong> Set the scene with realistic Indian settings</li>
              <li><strong>Product Focus (2-4s):</strong> Close-up of product in use with Hindi dialogue</li>
              <li><strong>Human Reaction (4-6s):</strong> Authentic emotional response</li>
              <li><strong>Brand Finish (6-8s):</strong> Hero shot with clear logo visibility</li>
            </ul>
            <p className="mt-4">
              Click the copy button on any card to copy the complete prompt structure to your clipboard.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}


